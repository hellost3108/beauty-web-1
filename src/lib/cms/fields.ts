/*
 * Field model for the Melalogy CMS.
 *
 * Every editable block of the public website is described by a list of
 * fields. The same description drives three things:
 *   1. the Admin form (which input to render, labels, help text),
 *   2. normalisation on the website (missing or malformed data from Supabase
 *      falls back to the default copy that ships with the code),
 *   3. validation + sanitising on the server before anything is written.
 *
 * This file must stay framework-free so it can be imported by server
 * actions, server components and client components alike.
 */

import { filterStyle } from "./style-filter";

type BaseField = {
  name: string;
  label: string;
  help?: string;
  required?: boolean;
  /** Layout hint for the Admin form grid. */
  width?: "full" | "half";
};

export type TextField = BaseField & { type: "text"; placeholder?: string; maxLength?: number };
export type TextareaField = BaseField & { type: "textarea"; rows?: number; maxLength?: number };
export type RichTextField = BaseField & { type: "richtext" };
export type ImageField = BaseField & { type: "image"; folder?: string };
export type LinkField = BaseField & { type: "link"; placeholder?: string };
export type NumberField = BaseField & { type: "number"; min?: number; max?: number; step?: number; defaultValue?: number };
export type BooleanField = BaseField & { type: "boolean"; defaultValue?: boolean };
export type SelectField = BaseField & {
  type: "select";
  options: ReadonlyArray<{ value: string; label: string }>;
};
export type ListField = BaseField & {
  type: "list";
  /** Singular noun shown on buttons, e.g. "banner", "câu hỏi". */
  itemLabel: string;
  /** Field whose value is used as the collapsed title of an item. */
  titleField?: string;
  fields: Field[];
  min?: number;
  max?: number;
};

export type Field =
  | TextField
  | TextareaField
  | RichTextField
  | ImageField
  | LinkField
  | NumberField
  | BooleanField
  | SelectField
  | ListField;

export type ContentRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is ContentRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** The value a brand-new field or list item starts with. */
export function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "number":
      return field.defaultValue ?? field.min ?? 0;
    case "boolean":
      return field.defaultValue ?? false;
    case "select":
      return field.options[0]?.value ?? "";
    case "list":
      return [];
    default:
      return "";
  }
}

export function emptyItem(fields: Field[]): ContentRecord {
  return Object.fromEntries(fields.map((field) => [field.name, emptyValue(field)]));
}

function normalizeValue(field: Field, raw: unknown, fallback: unknown): unknown {
  switch (field.type) {
    case "number": {
      const value = typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() ? Number(raw) : NaN;
      return Number.isFinite(value) ? value : fallback;
    }
    case "boolean":
      return typeof raw === "boolean" ? raw : fallback;
    case "select":
      return typeof raw === "string" && field.options.some((option) => option.value === raw) ? raw : fallback;
    case "list": {
      if (!Array.isArray(raw)) return fallback;
      const blank = emptyItem(field.fields);
      return raw.filter(isRecord).map((item) => normalizeContent(field.fields, item, blank));
    }
    default:
      return typeof raw === "string" ? raw : fallback;
  }
}

/**
 * Returns an object that has exactly the shape described by `fields`.
 * Values stored in Supabase win; anything missing or of the wrong type falls
 * back to `defaults`, so the website never renders `undefined`.
 */
export function normalizeContent(
  fields: Field[],
  raw: unknown,
  defaults: ContentRecord,
): ContentRecord {
  const source = isRecord(raw) ? raw : {};
  const result: ContentRecord = {};
  for (const field of fields) {
    const fallback = field.name in defaults ? defaults[field.name] : emptyValue(field);
    result[field.name] = field.name in source ? normalizeValue(field, source[field.name], fallback) : fallback;
  }
  return result;
}

/* ------------------------------------------------------------------ */
/* Server-side sanitising + validation                                 */
/* ------------------------------------------------------------------ */

const MAX_TEXT = 20_000;
const MAX_HTML = 200_000;

export function safeUrl(value: string): string {
  const url = value.trim();
  if (!url) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
  return "";
}

/**
 * Conservative HTML clean-up for rich text written by staff: removes active
 * content (scripts, frames, forms, event handlers, javascript: URLs) and
 * keeps only whitelisted inline styles (colour, size, weight, alignment…),
 * see style-filter.ts.
 */
export function sanitizeHtml(input: string): string {
  let html = input.slice(0, MAX_HTML);
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(
    /<(script|style|iframe|object|embed|form|input|button|textarea|select|link|meta|base|svg|math|noscript|template)\b[\s\S]*?(<\/\1\s*>|$)/gi,
    "",
  );
  html = html.replace(/<(script|style|iframe|object|embed|link|meta|base|input)\b[^>]*\/?>/gi, "");
  // Event handlers and presentation classes.
  html = html.replace(/\s(on[a-z]+|class|srcdoc|formaction)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  // Inline styles: keep only the whitelisted, harmless properties.
  html = html.replace(/\sstyle\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi, (_match, _quoted, dq?: string, sq?: string, bare?: string) => {
    const cleaned = filterStyle((dq ?? sq ?? bare ?? "").replace(/&quot;/g, '"').replace(/&#39;/g, "'"));
    return cleaned ? ` style="${cleaned.replace(/"/g, "&quot;")}"` : "";
  });
  // Dangerous URL schemes in href/src.
  html = html.replace(
    /\s(href|src|xlink:href)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    (match, attr: string, _quoted, dq?: string, sq?: string, bare?: string) => {
      const value = (dq ?? sq ?? bare ?? "").trim();
      const cleaned = safeUrl(value.replace(/&amp;/g, "&"));
      if (!cleaned) return "";
      return ` ${attr.toLowerCase()}="${cleaned.replace(/"/g, "&quot;")}"`;
    },
  );
  return html.trim();
}

export type ValidationIssue = { path: string; message: string };

function cleanValue(field: Field, raw: unknown, path: string, issues: ValidationIssue[]): unknown {
  const label = field.label;
  switch (field.type) {
    case "text":
    case "textarea": {
      const value = typeof raw === "string" ? raw.slice(0, field.maxLength ?? MAX_TEXT) : "";
      if (field.required && !value.trim()) issues.push({ path, message: `“${label}” không được để trống.` });
      return value;
    }
    case "richtext": {
      const value = typeof raw === "string" ? sanitizeHtml(raw) : "";
      if (field.required && !value.replace(/<[^>]*>/g, "").trim()) {
        issues.push({ path, message: `“${label}” không được để trống.` });
      }
      return value;
    }
    case "image":
    case "link": {
      const original = typeof raw === "string" ? raw.trim() : "";
      const value = safeUrl(original);
      if (original && !value) {
        issues.push({ path, message: `“${label}” phải là đường dẫn bắt đầu bằng /, https://, mailto: hoặc tel:.` });
      } else if (field.required && !value) {
        issues.push({ path, message: `“${label}” không được để trống.` });
      }
      return value;
    }
    case "number": {
      let value = typeof raw === "number" ? raw : Number(raw);
      if (!Number.isFinite(value)) {
        issues.push({ path, message: `“${label}” phải là số.` });
        value = field.min ?? 0;
      }
      if (field.min !== undefined && value < field.min) value = field.min;
      if (field.max !== undefined && value > field.max) value = field.max;
      return value;
    }
    case "boolean":
      return raw === true;
    case "select":
      return typeof raw === "string" && field.options.some((option) => option.value === raw)
        ? raw
        : field.options[0]?.value ?? "";
    case "list": {
      const items = Array.isArray(raw) ? raw.filter(isRecord) : [];
      if (field.min !== undefined && items.length < field.min) {
        issues.push({ path, message: `“${label}” cần ít nhất ${field.min} ${field.itemLabel}.` });
      }
      if (field.max !== undefined && items.length > field.max) {
        issues.push({ path, message: `“${label}” chỉ cho phép tối đa ${field.max} ${field.itemLabel}.` });
      }
      return items
        .slice(0, field.max ?? 200)
        .map((item, index) => cleanRecord(field.fields, item, `${path}.${index}`, issues));
    }
  }
}

function cleanRecord(fields: Field[], raw: ContentRecord, path: string, issues: ValidationIssue[]) {
  const result: ContentRecord = {};
  for (const field of fields) {
    result[field.name] = cleanValue(field, raw[field.name], path ? `${path}.${field.name}` : field.name, issues);
  }
  return result;
}

/** Strips unknown keys, coerces types, sanitises HTML/URLs and reports problems. */
export function sanitizeContent(fields: Field[], raw: unknown) {
  const issues: ValidationIssue[] = [];
  const content = cleanRecord(fields, isRecord(raw) ? raw : {}, "", issues);
  return { content, issues };
}
