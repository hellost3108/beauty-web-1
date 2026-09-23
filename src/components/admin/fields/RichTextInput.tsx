"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
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
  X,
} from "lucide-react";
import { allowedImageTypes, uploadImage } from "@/lib/admin/upload";
import { imageFigureHtml, richFonts, richImageAligns, richImageWidths, richSizes } from "@/lib/cms/rich-text";

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
    editor.querySelectorAll("span").forEach((span) => {
      if (!span.getAttribute("data-font") && !span.getAttribute("data-size")) {
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
      savedRange.current = selection.getRangeAt(0).cloneRange();
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

  /** Applies data-font / data-size to the selection (or the current paragraph). */
  const applyAttribute = (attribute: "data-font" | "data-size", attrValue: string) => {
    const range = restoreSelection();
    const editor = editorRef.current;
    if (!range || !editor) return;

    const setOn = (element: Element) => {
      if (attrValue) element.setAttribute(attribute, attrValue);
      else element.removeAttribute(attribute);
      element.querySelectorAll(`[${attribute}]`).forEach((child) => child.removeAttribute(attribute));
    };

    const startBlock = blockOf(range.startContainer);
    const endBlock = blockOf(range.endContainer);

    if (range.collapsed) {
      const block = startBlock ?? topLevelOf(range.startContainer);
      if (block) setOn(block);
    } else if (startBlock && startBlock === endBlock) {
      const fragment = range.extractContents();
      fragment.querySelectorAll?.(`[${attribute}]`).forEach((child) => child.removeAttribute(attribute));
      if (attrValue) {
        const span = document.createElement("span");
        span.setAttribute(attribute, attrValue);
        span.appendChild(fragment);
        range.insertNode(span);
        const selection = window.getSelection();
        const next = document.createRange();
        next.selectNodeContents(span);
        selection?.removeAllRanges();
        selection?.addRange(next);
        savedRange.current = next.cloneRange();
      } else {
        range.insertNode(fragment);
      }
    } else {
      // Selection spans several paragraphs: format each whole paragraph.
      editor.querySelectorAll(Array.from(BLOCK_TAGS).join(",")).forEach((block) => {
        if (range.intersectsNode(block) && !block.querySelector(Array.from(BLOCK_TAGS).join(","))) setOn(block);
      });
    }
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
                applyAttribute("data-font", event.target.value);
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
              className={toolbarSelect}
              defaultValue=""
              onMouseDown={saveSelection}
              onFocus={saveSelection}
              onChange={(event) => {
                applyAttribute("data-size", event.target.value);
                event.target.value = "";
              }}
              title="Cỡ chữ cho đoạn đang chọn"
              aria-label="Cỡ chữ"
            >
              <option value="" disabled hidden>
                Cỡ chữ
              </option>
              {richSizes.map((size) => (
                <option key={size.value || "normal"} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <span className="mx-1 h-6 w-px bg-black/10" aria-hidden="true" />
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "p")} title="Đoạn văn"><Pilcrow className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "h2")} title="Tiêu đề lớn"><Heading2 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "h3")} title="Tiêu đề nhỏ"><Heading3 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("bold")} title="In đậm"><Bold className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onMouseDown={(event) => event.preventDefault()} onClick={() => run("italic")} title="In nghiêng"><Italic className="h-4 w-4" /></button>
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
                applyAttribute("data-font", "");
                applyAttribute("data-size", "");
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
            const files = Array.from(event.clipboardData.files ?? []);
            if (files.some((file) => file.type.startsWith("image/"))) {
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
