"use client";

import { useRef, useState } from "react";
import { Bold, Italic, Link2, List, Quote } from "lucide-react";

const toolbarButton =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-black/10 bg-white px-2 text-xs font-semibold transition hover:border-[#f52334] hover:text-[#f52334]";

export default function RichTextEditor({
  name,
  initialValue = "",
}: {
  name: string;
  initialValue?: string | null;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(initialValue ?? "");

  const run = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setHtml(editorRef.current?.innerHTML ?? "");
  };

  const addLink = () => {
    const url = window.prompt("Nhập đường dẫn liên kết", "https://");
    if (url) run("createLink", url);
  };

  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-black/15 bg-white focus-within:border-[#f52334] focus-within:ring-2 focus-within:ring-[#f52334]/10">
      <div className="flex flex-wrap gap-1 border-b border-black/10 bg-[#f7f4f1] p-2">
        <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "p")}>Đoạn</button>
        <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "h2")}>H2</button>
        <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "h3")}>H3</button>
        <button type="button" className={toolbarButton} onClick={() => run("bold")} aria-label="In đậm"><Bold className="h-4 w-4" /></button>
        <button type="button" className={toolbarButton} onClick={() => run("italic")} aria-label="In nghiêng"><Italic className="h-4 w-4" /></button>
        <button type="button" className={toolbarButton} onClick={() => run("insertUnorderedList")} aria-label="Danh sách"><List className="h-4 w-4" /></button>
        <button type="button" className={toolbarButton} onClick={() => run("formatBlock", "blockquote")} aria-label="Trích dẫn"><Quote className="h-4 w-4" /></button>
        <button type="button" className={toolbarButton} onClick={addLink} aria-label="Thêm liên kết"><Link2 className="h-4 w-4" /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => setHtml(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: initialValue ?? "" }}
        className="blog-prose-2026 min-h-96 max-w-none px-5 py-4 text-sm leading-7 outline-none"
      />
      <textarea name={name} value={html} readOnly required className="sr-only" />
    </div>
  );
}
