"use client";

import { safeUrl } from "@/lib/cms/fields";
import { filterStyle } from "@/lib/cms/style-filter";

/*
 * Turns HTML copied from Word, Google Docs or other websites into clean,
 * brand-safe HTML while keeping what editors care about: paragraphs,
 * headings, bold/italic/underline, colours, font sizes, alignment, lists,
 * links, tables and images. Word artefacts (mso-* styles, <o:p>, conditional
 * comments, bullet glyph spans) are removed and Word lists become real lists.
 */

const BLOCK = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "LI", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TFOOT", "TR", "TD", "TH", "HR", "FIGURE", "FIGCAPTION"]);
const INLINE = new Set(["STRONG", "EM", "U", "S", "SUB", "SUP", "A", "SPAN", "BR", "IMG", "CODE"]);
const RENAME: Record<string, string> = { B: "STRONG", I: "EM", STRIKE: "S", DEL: "S", INS: "U", FONT: "SPAN", H1: "H2", H5: "H4", H6: "H4", PRE: "P" };
const DROP = new Set(["SCRIPT", "STYLE", "META", "LINK", "TITLE", "HEAD", "XML", "IFRAME", "OBJECT", "EMBED", "SVG", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "NOSCRIPT", "TEMPLATE"]);

export type PastedImage = { element: HTMLImageElement; originalSrc: string };

function styleFromFont(element: Element) {
  // <font color="#f00" size="5"> → style
  const parts: string[] = [];
  const color = element.getAttribute("color");
  if (color) parts.push(`color: ${color}`);
  const size = Number(element.getAttribute("size"));
  const sizes = [0, 10, 13, 16, 18, 24, 32, 48];
  if (size >= 1 && size <= 7) parts.push(`font-size: ${sizes[size]}px`);
  return parts.join("; ");
}

function wordListInfo(element: Element): { ordered: boolean; marker: string } | null {
  const style = element.getAttribute("style") ?? "";
  const className = element.getAttribute("class") ?? "";
  if (!/mso-list/i.test(style) && !/MsoListParagraph/i.test(className)) return null;
  const ignore = element.querySelector('[style*="mso-list:Ignore"], [style*="mso-list: Ignore"]');
  const marker = (ignore?.textContent ?? "").replace(/\s+/g, " ").trim();
  return { ordered: /^(\d+|[a-z]|[ivxlc]+)[.)]/i.test(marker), marker };
}

function cleanNode(node: Node, doc: Document, images: PastedImage[]): Node[] {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = (node.textContent ?? "").replace(/ /g, " ");
    return text ? [doc.createTextNode(text)] : [];
  }
  if (!(node instanceof Element)) return [];

  const rawTag = node.tagName.toUpperCase();
  if (DROP.has(rawTag) || rawTag.includes(":")) {
    // <o:p>, <w:sdt>… keep their text, drop the tag.
    return rawTag.includes(":") ? cleanChildren(node, doc, images) : [];
  }
  const style = node.getAttribute("style") ?? "";
  if (/mso-list\s*:\s*ignore/i.test(style)) return []; // Word bullet glyphs
  if (/display\s*:\s*none/i.test(style)) return [];

  let tag = RENAME[rawTag] ?? rawTag;
  // Google Docs wraps everything in <b style="font-weight:normal">.
  if (tag === "STRONG" && /font-weight\s*:\s*(normal|400)/i.test(style)) tag = "SPAN";
  if (tag === "DIV" || tag === "SECTION" || tag === "ARTICLE" || tag === "MAIN" || tag === "HEADER" || tag === "FOOTER") {
    const hasBlock = Array.from(node.children).some((child) => BLOCK.has((RENAME[child.tagName] ?? child.tagName).toUpperCase()) || child.tagName === "DIV");
    tag = hasBlock ? "" : "P";
  }
  if (!tag || (!BLOCK.has(tag) && !INLINE.has(tag))) return cleanChildren(node, doc, images);

  const element = doc.createElement(tag.toLowerCase());
  const filtered = filterStyle([style, rawTag === "FONT" ? styleFromFont(node) : ""].filter(Boolean).join(";"));
  const align = node.getAttribute("align");
  const alignStyle = align && !/text-align/i.test(filtered) && /^(center|right|justify)$/i.test(align) ? `text-align: ${align.toLowerCase()}` : "";
  const finalStyle = [filtered, alignStyle].filter(Boolean).join("; ");
  if (finalStyle && tag !== "IMG" && tag !== "BR" && tag !== "HR") element.setAttribute("style", finalStyle);

  if (tag === "A") {
    const href = safeUrl(node.getAttribute("href") ?? "");
    if (!href) return cleanChildren(node, doc, images);
    element.setAttribute("href", href);
    if (/^https?:/i.test(href)) element.setAttribute("rel", "noopener noreferrer");
  }
  if (tag === "IMG") {
    const src = node.getAttribute("src") ?? "";
    if (!src) return [];
    const image = element as HTMLImageElement;
    image.setAttribute("alt", node.getAttribute("alt") ?? "");
    const width = Number(node.getAttribute("width"));
    if (width > 0 && width < 2000) image.setAttribute("width", String(Math.round(width)));
    // The real src is resolved (uploaded to storage) after the paste lands.
    image.setAttribute("data-original-src", src);
    images.push({ element: image, originalSrc: src });
    return [image];
  }
  if (tag === "TD" || tag === "TH") {
    for (const attr of ["colspan", "rowspan"]) {
      const value = Number(node.getAttribute(attr));
      if (value > 1 && value < 50) element.setAttribute(attr, String(value));
    }
  }

  const wordList = node.getAttribute("data-word-list");
  if (tag === "P" && wordList) element.setAttribute("data-word-list", wordList);

  cleanChildren(node, doc, images).forEach((child) => element.appendChild(child));
  if (tag === "SPAN" && !element.getAttribute("style")) return Array.from(element.childNodes);
  if (["STRONG", "EM", "U", "S", "SPAN", "A"].includes(tag) && !element.textContent?.trim() && !element.querySelector("img")) {
    return element.textContent ? [doc.createTextNode(element.textContent)] : [];
  }
  return [element];
}

function cleanChildren(node: Node, doc: Document, images: PastedImage[]): Node[] {
  return Array.from(node.childNodes).flatMap((child) => cleanNode(child, doc, images));
}

export function cleanPastedHtml(html: string) {
  const prepared = html
    .replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?o:p[^>]*>/gi, "");
  const source = new DOMParser().parseFromString(prepared, "text/html");

  // Mark Word list paragraphs before cleaning strips their mso-* styles.
  source.body.querySelectorAll("p").forEach((paragraph) => {
    const info = wordListInfo(paragraph);
    if (info) paragraph.setAttribute("data-word-list", info.ordered ? "ol" : "ul");
  });

  const images: PastedImage[] = [];
  const target = document.implementation.createHTMLDocument("");
  const container = target.createElement("div");
  source.body.childNodes.forEach((child) => {
    cleanNode(child, target, images).forEach((node) => container.appendChild(node));
  });

  convertWordLists(container);

  // Loose inline content at the top level goes into paragraphs.
  const wrapped = target.createElement("div");
  let paragraph: HTMLElement | null = null;
  Array.from(container.childNodes).forEach((child) => {
    const isBlock = child instanceof Element && BLOCK.has(child.tagName);
    if (isBlock) {
      paragraph = null;
      wrapped.appendChild(child);
    } else {
      if (!paragraph) {
        if (child.nodeType === Node.TEXT_NODE && !child.textContent?.trim()) return;
        paragraph = target.createElement("p");
        wrapped.appendChild(paragraph);
      }
      paragraph.appendChild(child);
    }
  });

  // Remove empty paragraphs Word adds between blocks.
  wrapped.querySelectorAll("p").forEach((p) => {
    if (!p.textContent?.trim() && !p.querySelector("img,br")) p.remove();
  });

  return { html: wrapped.innerHTML, images };
}

/** Groups consecutive Word "list paragraphs" into real <ul>/<ol> lists. */
function convertWordLists(root: Element) {
  let currentList: HTMLElement | null = null;
  Array.from(root.children).forEach((child) => {
    const kind = child.getAttribute("data-word-list");
    if (child.tagName !== "P" || (kind !== "ul" && kind !== "ol")) {
      currentList = null;
      return;
    }
    if (!currentList || currentList.tagName.toLowerCase() !== kind || currentList.nextElementSibling !== child) {
      currentList = root.ownerDocument.createElement(kind);
      child.before(currentList);
    }
    const item = root.ownerDocument.createElement("li");
    item.innerHTML = child.innerHTML;
    const style = child.getAttribute("style");
    if (style) item.setAttribute("style", style);
    currentList.appendChild(item);
    child.remove();
  });
}

/** Converts a data: URI to a File so it can be uploaded to storage. */
export function dataUriToFile(dataUri: string, name: string): File | null {
  const match = dataUri.match(/^data:(image\/[a-z+.-]+);base64,(.+)$/i);
  if (!match) return null;
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  const extension = match[1].split("/")[1].replace("jpeg", "jpg").replace("+xml", "");
  return new File([bytes], `${name}.${extension}`, { type: match[1] });
}
