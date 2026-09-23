"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import { emptyItem, type ContentRecord, type Field, type ListField } from "@/lib/cms/fields";
import ImageInput from "@/components/admin/fields/ImageInput";
import RichTextInput from "@/components/admin/fields/RichTextInput";
import { buttonClass, helpClass, inputClass, labelClass } from "@/components/admin/ui";

type FieldControlProps = {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
  folder: string;
  error?: string;
  /** All validation errors of the section, keyed by path (for nested lists). */
  errors?: Record<string, string>;
  path?: string;
};

const asString = (value: unknown) => (typeof value === "string" ? value : value == null ? "" : String(value));

export function FieldControl({ field, value, onChange, folder, error, errors = {}, path = field.name }: FieldControlProps) {
  const label = (
    <span className="flex items-baseline gap-1">
      {field.label}
      {field.required && <span className="text-[#f52334]" aria-hidden="true">*</span>}
    </span>
  );
  const help = field.help ? <span className={helpClass}>{field.help}</span> : null;
  const errorText = error ? <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span> : null;
  const invalid = error ? " border-red-400 focus:border-red-500" : "";

  switch (field.type) {
    case "text":
    case "link":
      return (
        <label className={labelClass}>
          {label}
          <input
            className={inputClass + invalid}
            value={asString(value)}
            placeholder={field.placeholder}
            maxLength={field.type === "text" ? field.maxLength : 2048}
            onChange={(event) => onChange(event.target.value)}
            inputMode={field.type === "link" ? "url" : undefined}
          />
          {help}
          {errorText}
        </label>
      );
    case "textarea":
      return (
        <label className={labelClass}>
          {label}
          <textarea
            className={`${inputClass}${invalid} resize-y leading-6`}
            rows={field.rows ?? 3}
            value={asString(value)}
            maxLength={field.maxLength}
            onChange={(event) => onChange(event.target.value)}
          />
          {help}
          {errorText}
        </label>
      );
    case "richtext":
      return (
        <div className={labelClass}>
          {label}
          <RichTextInput value={asString(value)} onChange={onChange} />
          {help}
          {errorText}
        </div>
      );
    case "image":
      return (
        <div className={labelClass}>
          {label}
          <ImageInput value={asString(value)} onChange={onChange} folder={field.folder ?? folder} />
          {help}
          {errorText}
        </div>
      );
    case "number":
      return (
        <label className={labelClass}>
          {label}
          <input
            type="number"
            className={inputClass + invalid}
            value={typeof value === "number" && Number.isFinite(value) ? value : ""}
            min={field.min}
            max={field.max}
            step={field.step ?? 1}
            onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
          />
          {help}
          {errorText}
        </label>
      );
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-[#fcfbfa] px-4 py-3 text-sm font-semibold text-black/70 md:mt-7">
          <span
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${value ? "bg-emerald-500" : "bg-black/20"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${value ? "left-[22px]" : "left-0.5"}`} />
          </span>
          <input type="checkbox" className="sr-only" checked={value === true} onChange={(event) => onChange(event.target.checked)} />
          {field.label}
        </label>
      );
    case "select":
      return (
        <label className={labelClass}>
          {label}
          <select className={inputClass} value={asString(value)} onChange={(event) => onChange(event.target.value)}>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {help}
        </label>
      );
    case "list":
      return (
        <ListControl
          field={field}
          value={Array.isArray(value) ? (value as ContentRecord[]) : []}
          onChange={onChange}
          folder={folder}
          error={error}
          errors={errors}
          path={path}
        />
      );
  }
}

export function FieldGrid({
  fields,
  value,
  onChange,
  folder,
  errors,
  pathPrefix = "",
}: {
  fields: Field[];
  value: ContentRecord;
  onChange: (next: ContentRecord) => void;
  folder: string;
  errors: Record<string, string>;
  pathPrefix?: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((field) => {
        const path = pathPrefix ? `${pathPrefix}.${field.name}` : field.name;
        return (
          <div key={field.name} className={field.width === "half" ? "" : "md:col-span-2"}>
            <FieldControl
              field={field}
              value={value[field.name]}
              folder={folder}
              error={errors[path]}
              errors={errors}
              path={path}
              onChange={(next) => onChange({ ...value, [field.name]: next })}
            />
          </div>
        );
      })}
    </div>
  );
}

function ListControl({
  field,
  value,
  onChange,
  folder,
  error,
  errors,
  path,
}: {
  field: ListField;
  value: ContentRecord[];
  onChange: (value: unknown) => void;
  folder: string;
  error?: string;
  errors: Record<string, string>;
  path: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(value.length <= 1 ? 0 : null);
  const itemHasError = (index: number) => Object.keys(errors).some((key) => key.startsWith(`${path}.${index}.`));
  const canAdd = field.max === undefined || value.length < field.max;
  const canRemove = field.min === undefined || value.length > field.min;

  const update = (next: ContentRecord[]) => onChange(next);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    update(next);
    setOpenIndex(openIndex === from ? to : openIndex);
  };

  const itemTitle = (item: ContentRecord, index: number) => {
    const raw = field.titleField ? item[field.titleField] : undefined;
    const text = typeof raw === "string" ? raw.replace(/<[^>]*>/g, "").trim() : "";
    return text || `${field.itemLabel.charAt(0).toUpperCase()}${field.itemLabel.slice(1)} ${index + 1}`;
  };

  return (
    <div>
      <div className={`${labelClass} flex items-center justify-between gap-3`}>
        <span>
          {field.label}
          <span className="ml-2 text-xs font-normal text-black/40">
            {value.length}
            {field.max !== undefined ? ` / ${field.max}` : ""} {field.itemLabel}
          </span>
        </span>
      </div>
      {field.help && <span className={helpClass}>{field.help}</span>}

      <ol className="mt-3 space-y-2">
        {value.map((item, index) => {
          const invalidItem = itemHasError(index);
          const open = openIndex === index || invalidItem;
          const image = field.fields.find((child) => child.type === "image");
          const thumb = image && typeof item[image.name] === "string" ? (item[image.name] as string) : "";
          const disabled = item.enabled === false;
          return (
            <li
              key={index}
              className={`overflow-hidden rounded-2xl border ${invalidItem ? "border-red-300" : open ? "border-black/20 shadow-sm" : "border-black/10"} bg-[#fcfbfa]`}
            >
              <div className="flex items-center gap-2 px-3 py-2.5">
                <GripVertical className="h-4 w-4 shrink-0 text-black/25" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  aria-expanded={open}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-black/50 ring-1 ring-black/10">
                    {index + 1}
                  </span>
                  {thumb && <img src={thumb} alt="" className="h-9 w-12 shrink-0 rounded-md object-cover ring-1 ring-black/10" />}
                  <span className={`truncate text-sm font-semibold ${disabled ? "text-black/35 line-through" : ""}`}>
                    {itemTitle(item, index)}
                  </span>
                  {disabled && <span className="shrink-0 rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-semibold text-black/50">Đang ẩn</span>}
                </button>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" className={buttonClass.icon} onClick={() => move(index, index - 1)} disabled={index === 0} title="Đưa lên" aria-label="Đưa lên">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button type="button" className={buttonClass.icon} onClick={() => move(index, index + 1)} disabled={index === value.length - 1} title="Đưa xuống" aria-label="Đưa xuống">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={buttonClass.icon}
                    disabled={!canAdd}
                    onClick={() => {
                      const next = [...value];
                      next.splice(index + 1, 0, structuredClone(item));
                      update(next);
                      setOpenIndex(index + 1);
                    }}
                    title="Nhân bản"
                    aria-label="Nhân bản"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className={`${buttonClass.icon} hover:border-red-300 hover:text-red-600`}
                    disabled={!canRemove}
                    onClick={() => {
                      if (!window.confirm(`Xoá ${field.itemLabel} “${itemTitle(item, index)}”?`)) return;
                      update(value.filter((_, position) => position !== index));
                      setOpenIndex(null);
                    }}
                    title="Xoá"
                    aria-label="Xoá"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {open && (
                <div className="border-t border-black/10 bg-white p-4 sm:p-5">
                  <FieldGrid
                    fields={field.fields}
                    value={item}
                    folder={folder}
                    errors={errors}
                    pathPrefix={`${path}.${index}`}
                    onChange={(nextItem) => update(value.map((current, position) => (position === index ? nextItem : current)))}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {canAdd && (
        <button
          type="button"
          className={`${buttonClass.ghost} mt-3`}
          onClick={() => {
            update([...value, emptyItem(field.fields)]);
            setOpenIndex(value.length);
          }}
        >
          <Plus className="h-4 w-4" /> Thêm {field.itemLabel}
        </button>
      )}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
}
