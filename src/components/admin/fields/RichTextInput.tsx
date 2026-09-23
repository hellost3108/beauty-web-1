"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Code2, Eraser, Heading2, Heading3, Italic, Link2, List, ListOrdered, Pilcrow, Quote } from "lucide-react";

const toolbarButton =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-black/10 bg-white px-2 text-xs font-semibold text-black/65 transition hover:border-[#f52334] hover:text-[#f52334]";

/**
 * Lightweight rich text editor (bold, italic, headings, lists, links, quotes).
 * Pasted content is inserted as plain text so formatting copied from Word or
 * websites cannot break the brand typography. An HTML mode is available for
 * advanced edits.
 */
export default function RichTextInput({
  value,
  onChange,
  minHeight = 180,
}: {
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlMode, setHtmlMode] = useState(false);

  // Sync external changes (restore a version, reset, leaving HTML mode) into
  // the editable area. While typing, value === innerHTML so nothing resets.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || htmlMode) return;
    const current = editor.innerHTML === "<br>" ? "" : editor.innerHTML;
    if (current !== value) editor.innerHTML = value;
  }, [value, htmlMode]);

  const emit = () => {
    const html = editorRef.current?.innerHTML ?? "";
    onChange(html === "<br>" ? "" : html);
  };

  const run = (command: string, argument?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    emit();
  };

  const addLink = () => {
    const url = window.prompt("Nhập đường dẫn (ví dụ /shop hoặc https://...)", "/");
    if (url) run("createLink", url);
  };

  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-black/15 bg-white focus-within:border-[#f52334] focus-within:ring-2 focus-within:ring-[#f52334]/10">
      <div className="flex flex-wrap gap-1 border-b border-black/10 bg-[#f7f4f1] p-2">
        {!htmlMode && (
          <>
            <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "p")} title="Đoạn văn"><Pilcrow className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "h2")} title="Tiêu đề lớn"><Heading2 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "h3")} title="Tiêu đề nhỏ"><Heading3 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("bold")} title="In đậm"><Bold className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("italic")} title="In nghiêng"><Italic className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("insertUnorderedList")} title="Danh sách chấm"><List className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("insertOrderedList")} title="Danh sách số"><ListOrdered className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "blockquote")} title="Trích dẫn"><Quote className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={addLink} title="Chèn liên kết"><Link2 className="h-4 w-4" /></button>
            <button type="button" className={toolbarButton} onClick={() => run("removeFormat")} title="Xoá định dạng"><Eraser className="h-4 w-4" /></button>
          </>
        )}
        <button
          type="button"
          className={`${toolbarButton} ml-auto gap-1 ${htmlMode ? "border-[#f52334] text-[#f52334]" : ""}`}
          onClick={() => setHtmlMode((mode) => !mode)}
          title="Sửa mã HTML"
        >
          <Code2 className="h-4 w-4" /> HTML
        </button>
      </div>

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
          onInput={emit}
          onBlur={emit}
          onPaste={(event) => {
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
            emit();
          }}
          style={{ minHeight }}
          className="admin-rich-text max-w-none px-4 py-3 text-sm leading-7 outline-none"
        />
      )}
    </div>
  );
}
