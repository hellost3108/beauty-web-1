"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Highlighter,
  Code2,
  Eraser,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  Pilcrow,
  Quote,
  Trash2,
  Underline,
  X,
} from "lucide-react";
import { cleanPastedHtml, dataUriToFile } from "@/lib/admin/paste-cleaner";
import { allowedImageTypes, uploadImage } from "@/lib/admin/upload";
import { imageFigureHtml, richColors, richFonts, richFontSizes, richImageAligns, richImageWidths } from "@/lib/cms/rich-text";

const toolbarButton =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-black/10 bg-white px-2 text-xs font-semibold text-black/65 transition hover:border-[#f52334] hover:text-[#f52334] disabled:opacity-40";
const toolbarSelect =
  "h-8 rounded-lg border border-black/10 bg-white px-2 text-xs font-semibold text-black/70 outline-none hover:border-[#f52334] focus:border-[#f52334]";

const BLOCK_TAGS = new Set(["P", "H1", "H2", "H3", "H4", "LI", "BLOCKQUOTE", "DIV", "FIGCAPTION"]);

type ImageDraft = { src: string; alt: string; caption: string; width: string; align: string };
const emptyImage: ImageDraft = { src: "", alt: "", caption: "", width: "full", align: "center" };

/**
 * Rich text editor for articles and policy pages: headings, bold/italic,
 * lists, links, quotes, font family + size (brand-approved list) and images
 * (upload, paste or drop; width, alignment, caption). Pasted text is inserted
 * as plain text so formatting copied from Word or websites cannot break the
 * brand typography. An HTML mode is available for advanced edits.
 */
export default function RichTextInput({
  value,
  onChange,
  minHeight = 180,
  uploadFolder = "content",
}: {
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
  uploadFolder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [htmlMode, setHtmlMode] = useState(false);
  const [imageDialog, setImageDialog] = useState<ImageDraft | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedFigure, setSelectedFigure] = useState<HTMLElement | null>(null);
  const [, forceRender] = useState(0);
  const [currentSize, setCurrentSize] = useState("");
  const [colorMenu, setColorMenu] = useState<"color" | "background-color" | null>(null);
  const [notice, setNotice] = useState("");

  // Sync external changes (restore a version, reset, leaving HTML mode) into
  // the editable area. While typing, value === innerHTML so nothing resets.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || htmlMode) return;
    const raw = editor.innerHTML.replace(/\sdata-selected=""/g, "");
    const current = raw === "<br>" ? "" : raw;
    if (current !== value) editor.innerHTML = value;
  }, [value, htmlMode]);

  const emit = () => {
    const editor = editorRef.current;
    if (!editor) return;
    // Drop wrapper spans that no longer carry any formatting.
    editor.querySelectorAll("[style]").forEach((element) => {
      if (!element.getAttribute("style")?.trim()) element.removeAttribute("style");
    });
    editor.querySelectorAll("span").forEach((span) => {
      if (!span.getAttribute("data-font") && !span.getAttribute("data-size") && !span.getAttribute("style")) {
        span.replaceWith(...Array.from(span.childNodes));
      }
    });
    const html = editor.innerHTML.replace(/\sdata-selected=""/g, "");
    onChange(html === "<br>" ? "" : html);
  };

  /* ---------------- selection helpers ---------------- */

  const inEditor = (node: Node | null) => Boolean(node && editorRef.current?.contains(node));

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && inEditor(selection.getRangeAt(0).commonAncestorContainer)) {
      const range = selection.getRangeAt(0);
      savedRange.current = range.cloneRange();
      const node = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
      if (node) setCurrentSize(String(Math.round(parseFloat(window.getComputedStyle(node).fontSize))));
    }
  };

  const restoreSelection = () => {
    const range = savedRange.current;
    const selection = window.getSelection();
    if (!range || !selection) return null;
    editorRef.current?.focus();
    selection.removeAllRanges();
    selection.addRange(range);
    return range;
  };

  const blockOf = (node: Node | null): HTMLElement | null => {
    let current: Node | null = node;
    while (current && current !== editorRef.current) {
      if (current instanceof HTMLElement && BLOCK_TAGS.has(current.tagName)) return current;
      current = current.parentNode;
    }
    return null;
  };

  /** Top-level child of the editor that contains `node`. */
  const topLevelOf = (node: Node | null): Element | null => {
    let current: Node | null = node;
    while (current && current.parentNode !== editorRef.current) current = current.parentNode;
    return current instanceof Element ? current : null;
  };

  const run = (command: string, argument?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    emit();
  };

  type Format = { kind: "attr"; name: "data-font"; value: string } | { kind: "style"; name: "font-size" | "color" | "background-color"; value: string };

  const blockSelector = Array.from(BLOCK_TAGS).join(",");

  /** Blocks touched by the range (or the block holding the caret). */
  const blocksIn = (range: Range) => {
    const editor = editorRef.current;
    if (!editor) return [] as HTMLElement[];
    if (range.collapsed || blockOf(range.startContainer) === blockOf(range.endContainer)) {
      const block = blockOf(range.startContainer) ?? topLevelOf(range.startContainer);
      return block instanceof HTMLElement ? [block] : [];
    }
    return Array.from(editor.querySelectorAll<HTMLElement>(blockSelector)).filter(
      (block) => range.intersectsNode(block) && !block.querySelector(blockSelector),
    );
  };

  const setFormat = (element: HTMLElement, format: Format) => {
    if (format.kind === "attr") {
      if (format.value) element.setAttribute(format.name, format.value);
      else element.removeAttribute(format.name);
      element.querySelectorAll(`[${format.name}]`).forEach((child) => child.removeAttribute(format.name));
      return;
    }
    if (format.value) element.style.setProperty(format.name, format.value);
    else element.style.removeProperty(format.name);
    element.querySelectorAll<HTMLElement>("[style]").forEach((child) => child.style.removeProperty(format.name));
    if (format.name === "font-size") {
      element.removeAttribute("data-size");
      element.querySelectorAll("[data-size]").forEach((child) => child.removeAttribute("data-size"));
    }
  };

  /** Applies a font, size or colour to the selection (or the current paragraph). */
  const applyFormat = (input: Format | Format[]) => {
    const formats = Array.isArray(input) ? input : [input];
    const range = restoreSelection();
    const editor = editorRef.current;
    if (!range || !editor) return;

    const startBlock = blockOf(range.startContainer);
    const endBlock = blockOf(range.endContainer);

    if (!range.collapsed && startBlock && startBlock === endBlock) {
      const fragment = range.extractContents();
      const span = document.createElement("span");
      span.appendChild(fragment);
      formats.forEach((format) => setFormat(span, format));
      range.insertNode(span);
      const selection = window.getSelection();
      const next = document.createRange();
      next.selectNodeContents(span);
      selection?.removeAllRanges();
      selection?.addRange(next);
      savedRange.current = next.cloneRange();
    } else {
      blocksIn(range).forEach((block) => formats.forEach((format) => setFormat(block, format)));
    }
    emit();
    saveSelection();
  };

  const alignText = (align: "left" | "center" | "right" | "justify") => {
    const range = restoreSelection();
    if (!range) return;
    blocksIn(range).forEach((block) => {
      if (align === "left") block.style.removeProperty("text-align");
      else block.style.setProperty("text-align", align);
    });
    emit();
  };

  /* ---------------- images ---------------- */

  const insertFigure = (draft: ImageDraft) => {
    const editor = editorRef.current;
    if (!editor || !draft.src) return;
    const template = document.createElement("template");
    template.innerHTML = imageFigureHtml(draft);
    const figure = template.content.firstElementChild;
    if (!figure) return;

    const anchor = savedRange.current ? topLevelOf(savedRange.current.startContainer) : null;
    if (anchor && anchor !== editor) anchor.after(figure);
    else editor.appendChild(figure);

    if (!figure.nextElementSibling) {
      const paragraph = document.createElement("p");
      paragraph.appendChild(document.createElement("br"));
      figure.after(paragraph);
    }
    emit();
  };

  const uploadFiles = async (files: File[], draft?: Partial<ImageDraft>) => {
    const images = files.filter((file) => allowedImageTypes.includes(file.type));
    if (!images.length) return;
    setUploading(true);
    setUploadError("");
    try {
      for (const file of images) {
        const { url } = await uploadImage(file, uploadFolder);
        if (draft) {
          setImageDialog((current) => (current ? { ...current, src: url, alt: current.alt || file.name.replace(/\.[^.]+$/, "") } : current));
        } else {
          insertFigure({ ...emptyImage, src: url, alt: file.name.replace(/\.[^.]+$/, "") });
        }
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Không thể tải ảnh lên.");
    } finally {
      setUploading(false);
    }
  };

  /**
   * Paste from Word / Google Docs / websites keeping headings, bold, colours,
   * sizes, alignment, lists, tables and images. Images are copied into
   * Supabase Storage so they keep working after the source changes.
   */
  const pasteRichContent = async (html: string, clipboardFiles: File[]) => {
    const { html: cleaned, images } = cleanPastedHtml(html);
    if (!cleaned.trim()) return;
    restoreSelection();
    document.execCommand("insertHTML", false, cleaned);
    emit();
    if (!images.length) return;

    const editor = editorRef.current;
    if (!editor) return;
    const pending = Array.from(editor.querySelectorAll<HTMLImageElement>("img[data-original-src]"));
    let fileIndex = 0;
    let failed = 0;
    setUploading(true);
    for (const image of pending) {
      const original = image.getAttribute("data-original-src") ?? "";
      image.removeAttribute("data-original-src");
      try {
        let file: File | null = null;
        if (original.startsWith("data:")) {
          file = dataUriToFile(original, `pasted-${Date.now()}`);
        } else if (/^(file:|blob:|webkit-fake-url:)/i.test(original) || !original) {
          file = clipboardFiles[fileIndex] ?? null;
          fileIndex += 1;
        } else if (/^https?:/i.test(original)) {
          try {
            const response = await fetch(original);
            const blob = await response.blob();
            if (response.ok && blob.type.startsWith("image/")) {
              file = new File([blob], `pasted-${Date.now()}.${blob.type.split("/")[1] ?? "jpg"}`, { type: blob.type });
            }
          } catch {
            // Remote host blocks copying: keep linking to the original image.
          }
          if (!file) {
            image.setAttribute("src", original);
            continue;
          }
        } else if (original.startsWith("/")) {
          image.setAttribute("src", original);
          continue;
        }

        if (!file) throw new Error("missing");
        const { url } = await uploadImage(file, uploadFolder);
        image.setAttribute("src", url);
      } catch {
        failed += 1;
        image.remove();
      }
    }
    setUploading(false);
    emit();
    setNotice(
      failed
        ? `Đã dán nội dung. ${failed} ảnh không lấy được từ tài liệu gốc — hãy chèn lại bằng nút “Ảnh” hoặc kéo thả ảnh vào.`
        : `Đã dán nội dung và tải ${pending.length} ảnh lên kho ảnh Melalogy.`,
    );
  };

  const openImageDialog = () => {
    saveSelection();
    setUploadError("");
    setImageDialog({ ...emptyImage });
  };

  const updateFigure = (patch: { width?: string; align?: string; alt?: string }) => {
    const figure = selectedFigure;
    if (!figure) return;
    if (patch.width) figure.setAttribute("data-width", patch.width);
    if (patch.align) figure.setAttribute("data-align", patch.align);
    if (patch.alt !== undefined) figure.querySelector("img")?.setAttribute("alt", patch.alt);
    forceRender((count) => count + 1);
    emit();
  };

  const removeFigure = () => {
    selectedFigure?.remove();
    setSelectedFigure(null);
    emit();
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.querySelectorAll("figure[data-rt-image]").forEach((figure) => {
      figure.toggleAttribute("data-selected", figure === selectedFigure);
    });
  }, [selectedFigure, value]);

  const selectedImg = selectedFigure?.querySelector("img");

  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-black/15 bg-white focus-within:border-[#f52334] focus-within:ring-2 focus-within:ring-[#f52334]/10">
      <div className="flex flex-wrap items-center gap-1 border-b border-black/10 bg-[#f7f4f1] p-2">
        {!htmlMode && (
          <>
            <select
              className={toolbarSelect}
              defaultValue=""
              onMouseDown={saveSelection}
              onFocus={saveSelection}
              onChange={(event) => {
                applyFormat({ kind: "attr", name: "data-font", value: event.target.value });
                event.target.value = "";
              }}
              title="Phông chữ cho đoạn đang chọn"
              aria-label="Phông chữ"
            >
              <option value="" disabled hidden>
                Phông chữ
              </option>
              {richFonts.map((font) => (
                <option key={font.value || "default"} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <select
              className={`${toolbarSelect} w-[4.6rem]`}
              value={currentSize}
              onMouseDown={saveSelection}
              onFocus={saveSelection}
              onChange={(event) => {
                const size = event.target.value;
                setCurrentSize(size === "default" ? "" : size);
                applyFormat({ kind: "style", name: "font-size", value: size === "default" ? "" : `${size}px` });
              }}
              title="Cỡ chữ (px) cho chữ đang chọn"
              aria-label="Cỡ chữ"
            >
              <option value="" disabled hidden>
                {currentSize ? `${currentSize}` : "Cỡ"}
              </option>
              <option value="default">Mặc định</option>
              {currentSize && !richFontSizes.some((size) => String(size) === currentSize) && (
                <option value={currentSize} disabled>
                  {currentSize}
                </option>
              )}
              {richFontSizes.map((size) => (
                <option key={size} value={String(size)}>
                  {size}
                </option>
              ))}
            </select>
            <div className="relative">
              <button
                type="button"
                className={`${toolbarButton} gap-1`}
                onMouseDown={(event) => {
                  event.preventDefault();
                  saveSelection();
                }}
                onClick={() => setColorMenu((menu) => (menu === "color" ? null : "color"))}
                title="Màu chữ"
              >
                <Baseline className="h-4 w-4" />
              </button>
              {colorMenu === "color" && (
                <ColorMenu
                  title="Màu chữ"
                  onPick={(color) => {
                    applyFormat({ kind: "style", name: "color", value: color });
                    setColorMenu(null);
                  }}
                  onClose={() => setColorMenu(null)}
                />
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                className={toolbarButton}
                onMouseDown={(event) => {
                  event.preventDefault();
                  saveSelection();
                }}
                onClick={() => setColorMenu((menu) => (menu === "background-color" ? null : "background-color"))}
                title="Màu nền chữ (tô sáng)"
              >
                <Highlighter className="h-4 w-4" />
              </button>
              {colorMenu === "background-color" && (
                <ColorMenu
                  title="Màu nền chữ"
                  onPick={(color) => {
                    applyFormat({ kind: "style", name: "background-color", value: color });
                    setColorMenu(null);
                  }}
                  onClose={() => setColorMenu(null)}
                />
              )}
            </div>
            <span className="mx-1 h-6 w-px bg-black/10" aria-hidden="true" />
            {(
              [
                ["left", AlignLeft, "Căn trái"],
                ["center", AlignCenter, "Căn giữa"],
                ["right", AlignRight, "Căn phải"],
                ["justify", AlignJustify, "Căn đều hai bên"],
              ] as const
            ).map(([align, Icon, label]) => (
              <button
                key={align}
                type="button"
                className={toolbarButton}
                onMouseDown={(event) => {
                  event.preventDefault();
                  saveSelection();
                }}
                onClick={() => alignText(align)}
                title={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <span className="mx-1 h-6 w-px bg-black/10" aria-hidden="true" />
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "p")} title="Đoạn văn"><Pilcrow className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "h2")} title="Tiêu đề lớn"><Heading2 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "h3")} title="Tiêu đề nhỏ"><Heading3 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("bold")} title="In đậm"><Bold className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("italic")} title="In nghiêng"><Italic className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("underline")} title="Gạch chân"><Underline className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("insertUnorderedList")} title="Danh sách chấm"><List className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("insertOrderedList")} title="Danh sách số"><ListOrdered className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "blockquote")} title="Trích dẫn"><Quote className="h-4 w-4" /></button>
            <button
              type="button"
              className={toolbarButton}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                const url = window.prompt("Nhập đường dẫn (ví dụ /shop hoặc https://...)", "/");
                if (url) run("createLink", url);
              }}
              title="Chèn liên kết"
            >
              <Link2 className="h-4 w-4" />
            </button>
            <button type="button" className={`${toolbarButton} gap-1`} onMouseDown={(event) => event.preventDefault()} onClick={openImageDialog} title="Chèn ảnh">
              <ImagePlus className="h-4 w-4" /> Ảnh
            </button>
            <button
              type="button"
              className={toolbarButton}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                run("removeFormat");
                saveSelection();
                applyFormat([
                  { kind: "attr", name: "data-font", value: "" },
                  { kind: "style", name: "font-size", value: "" },
                  { kind: "style", name: "color", value: "" },
                  { kind: "style", name: "background-color", value: "" },
                ]);
              }}
              title="Xoá định dạng"
            >
              <Eraser className="h-4 w-4" />
            </button>
          </>
        )}
        <button
          type="button"
          className={`${toolbarButton} ml-auto gap-1 ${htmlMode ? "border-[#f52334] text-[#f52334]" : ""}`}
          onClick={() => {
            setSelectedFigure(null);
            setHtmlMode((mode) => !mode);
          }}
          title="Sửa mã HTML"
        >
          <Code2 className="h-4 w-4" /> HTML
        </button>
      </div>

      {selectedFigure && selectedImg && !htmlMode && (
        <div className="flex flex-wrap items-center gap-2 border-b border-black/10 bg-[#fff7f7] px-3 py-2 text-xs">
          <img src={selectedImg.getAttribute("src") ?? ""} alt="" className="h-9 w-12 rounded object-cover ring-1 ring-black/10" />
          <span className="font-semibold text-black/60">Ảnh đang chọn:</span>
          {richImageWidths.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${toolbarButton} ${selectedFigure.getAttribute("data-width") === option.value ? "border-[#f52334] text-[#f52334]" : ""}`}
              onClick={() => updateFigure({ width: option.value })}
            >
              {option.label}
            </button>
          ))}
          <span className="mx-1 h-6 w-px bg-black/10" aria-hidden="true" />
          {richImageAligns.map((option) => {
            const Icon = option.value === "left" ? AlignLeft : option.value === "right" ? AlignRight : AlignCenter;
            return (
              <button
                key={option.value}
                type="button"
                title={option.label}
                className={`${toolbarButton} ${selectedFigure.getAttribute("data-align") === option.value ? "border-[#f52334] text-[#f52334]" : ""}`}
                onClick={() => updateFigure({ align: option.value })}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
          <input
            key={selectedImg.getAttribute("src") ?? ""}
            defaultValue={selectedImg.getAttribute("alt") ?? ""}
            onBlur={(event) => updateFigure({ alt: event.target.value })}
            placeholder="Mô tả ảnh (SEO)"
            className="h-8 min-w-40 flex-1 rounded-lg border border-black/10 bg-white px-2 outline-none focus:border-[#f52334]"
          />
          <button type="button" className={`${toolbarButton} text-red-600`} onClick={removeFigure} title="Xoá ảnh">
            <Trash2 className="h-4 w-4" />
          </button>
          <button type="button" className={toolbarButton} onClick={() => setSelectedFigure(null)} title="Bỏ chọn">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {htmlMode ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          style={{ minHeight }}
          className="block w-full resize-y px-4 py-3 font-mono text-xs leading-6 outline-none"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => document.execCommand("defaultParagraphSeparator", false, "p")}
          onInput={emit}
          onBlur={() => {
            saveSelection();
            emit();
          }}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          onClick={(event) => {
            const figure = (event.target as HTMLElement).closest("figure[data-rt-image]");
            setSelectedFigure(figure instanceof HTMLElement && inEditor(figure) ? figure : null);
          }}
          onPaste={(event) => {
            const files = Array.from(event.clipboardData.files ?? []).filter((file) => file.type.startsWith("image/"));
            const html = event.clipboardData.getData("text/html");
            if (html) {
              event.preventDefault();
              saveSelection();
              void pasteRichContent(html, files);
              return;
            }
            if (files.length) {
              event.preventDefault();
              saveSelection();
              void uploadFiles(files);
              return;
            }
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
            emit();
          }}
          onDragOver={(event) => {
            if (Array.from(event.dataTransfer.types).includes("Files")) event.preventDefault();
          }}
          onDrop={(event) => {
            const files = Array.from(event.dataTransfer.files ?? []);
            if (!files.some((file) => file.type.startsWith("image/"))) return;
            event.preventDefault();
            saveSelection();
            void uploadFiles(files);
          }}
          style={{ minHeight }}
          className="admin-rich-text max-w-none px-4 py-3 text-sm leading-7 outline-none"
        />
      )}

      {uploading && !imageDialog && (
        <p className="flex items-center gap-2 border-t border-black/10 px-4 py-2 text-xs text-black/55">
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Đang tải ảnh lên...
        </p>
      )}
      {uploadError && !imageDialog && <p className="border-t border-black/10 px-4 py-2 text-xs font-medium text-red-600">{uploadError}</p>}
      {notice && (
        <p className="flex items-start justify-between gap-3 border-t border-black/10 bg-[#f7f4f1] px-4 py-2 text-xs text-black/60">
          {notice}
          <button type="button" onClick={() => setNotice("")} className="shrink-0 font-semibold hover:text-[#f52334]">
            Đóng
          </button>
        </p>
      )}

      {imageDialog && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <h3 className="font-display text-2xl">Chèn ảnh vào nội dung</h3>
              <button type="button" className={toolbarButton} onClick={() => setImageDialog(null)} aria-label="Đóng">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 p-5 text-sm">
              {imageDialog.src ? (
                <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f7f4f1]">
                  <img src={imageDialog.src} alt="" className="max-h-56 w-full object-contain" />
                  <button
                    type="button"
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white"
                    onClick={() => setImageDialog({ ...imageDialog, src: "" })}
                    aria-label="Chọn ảnh khác"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-[#fcfbfa] p-4 text-center hover:border-[#f52334]"
                >
                  {uploading ? <LoaderCircle className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6 text-black/45" />}
                  <span className="mt-2 font-semibold">{uploading ? "Đang tải ảnh..." : "Chọn ảnh từ máy"}</span>
                  <span className="mt-0.5 text-xs text-black/40">JPG, PNG, WebP, AVIF · tối đa 5 MB</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept={allowedImageTypes.join(",")}
                className="sr-only"
                onChange={(event) => {
                  void uploadFiles(Array.from(event.target.files ?? []), imageDialog);
                  event.target.value = "";
                }}
              />
              <label className="block font-semibold text-black/70">
                Hoặc dán đường dẫn ảnh
                <input
                  value={imageDialog.src}
                  onChange={(event) => setImageDialog({ ...imageDialog, src: event.target.value })}
                  placeholder="/assets/anh.png hoặc https://..."
                  className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-[#f52334]"
                />
              </label>
              <label className="block font-semibold text-black/70">
                Mô tả ảnh (SEO)
                <input
                  value={imageDialog.alt}
                  onChange={(event) => setImageDialog({ ...imageDialog, alt: event.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-[#f52334]"
                />
              </label>
              <label className="block font-semibold text-black/70">
                Chú thích dưới ảnh (tuỳ chọn)
                <input
                  value={imageDialog.caption}
                  onChange={(event) => setImageDialog({ ...imageDialog, caption: event.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-[#f52334]"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block font-semibold text-black/70">
                  Kích thước
                  <select
                    value={imageDialog.width}
                    onChange={(event) => setImageDialog({ ...imageDialog, width: event.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2 text-sm font-normal outline-none"
                  >
                    {richImageWidths.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block font-semibold text-black/70">
                  Vị trí
                  <select
                    value={imageDialog.align}
                    onChange={(event) => setImageDialog({ ...imageDialog, align: event.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2 text-sm font-normal outline-none"
                  >
                    {richImageAligns.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {uploadError && <p className="text-xs font-medium text-red-600">{uploadError}</p>}
              <p className="text-xs text-black/45">Mẹo: bạn cũng có thể dán (Cmd+V) hoặc kéo thả ảnh thẳng vào khung soạn thảo.</p>
            </div>
            <div className="flex justify-end gap-2 border-t border-black/10 p-4">
              <button type="button" className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold" onClick={() => setImageDialog(null)}>
                Huỷ
              </button>
              <button
                type="button"
                disabled={!imageDialog.src || uploading}
                className="rounded-full bg-[#f52334] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                onClick={() => {
                  insertFigure(imageDialog);
                  setImageDialog(null);
                }}
              >
                Chèn ảnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ColorMenu({ title, onPick, onClose }: { title: string; onPick: (color: string) => void; onClose: () => void }) {
  const [custom, setCustom] = useState("#d3172b");
  return (
    <div className="absolute left-0 top-9 z-30 w-60 rounded-2xl border border-black/10 bg-white p-3 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-black/60">
        {title}
        <button type="button" onClick={onClose} className="grid h-6 w-6 place-items-center rounded-full hover:bg-black/5" aria-label="Đóng">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {richColors.map((color) => (
          <button
            key={color.value}
            type="button"
            title={color.label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onPick(color.value)}
            className="h-7 w-7 rounded-lg ring-1 ring-black/15 transition hover:scale-110"
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input type="color" value={custom} onChange={(event) => setCustom(event.target.value)} className="h-8 w-10 cursor-pointer rounded border border-black/15 p-0.5" aria-label="Chọn màu khác" />
        <button type="button" onClick={() => onPick(custom)} className="flex-1 rounded-lg border border-black/10 px-2 py-1.5 text-xs font-semibold hover:border-[#f52334]">
          Dùng màu {custom.toUpperCase()}
        </button>
      </div>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => onPick("")} className="mt-2 w-full rounded-lg bg-[#f7f4f1] px-2 py-1.5 text-xs font-semibold text-black/60 hover:text-[#f52334]">
        Bỏ màu (dùng màu mặc định)
      </button>
    </div>
  );
}
