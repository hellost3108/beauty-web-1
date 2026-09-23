"use client";

import { useId, useState } from "react";
import { ImagePlus, Link2, LoaderCircle, Upload, X } from "lucide-react";
import { allowedImageTypes, uploadImage } from "@/lib/admin/upload";

/**
 * Image picker: upload a file to Supabase Storage or paste a path/URL
 * (existing files under /assets/... keep working).
 */
export default function ImageInput({
  value,
  onChange,
  folder = "misc",
  compact = false,
}: {
  value: string;
  onChange: (value: string) => void;
  folder?: string;
  compact?: boolean;
}) {
  const inputId = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showUrl, setShowUrl] = useState(false);

  const upload = async (file?: File) => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const { url } = await uploadImage(file, folder);
      onChange(url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Không thể tải ảnh lên.");
    } finally {
      setBusy(false);
    }
  };

  const picker = (
    <input
      id={inputId}
      type="file"
      accept={allowedImageTypes.join(",")}
      className="sr-only"
      disabled={busy}
      onChange={(event) => {
        void upload(event.target.files?.[0]);
        event.target.value = "";
      }}
    />
  );

  return (
    <div className="mt-2 space-y-2">
      {value ? (
        <div className="group relative overflow-hidden rounded-2xl border border-black/10 bg-[repeating-conic-gradient(#f1ede8_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
          <img
            src={value}
            alt="Ảnh đã chọn"
            className={`w-full object-contain ${compact ? "h-28" : "h-44"}`}
          />
          <div className="absolute right-2 top-2 flex gap-1.5">
            <label
              htmlFor={inputId}
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black/70 text-white transition hover:bg-[#f52334]"
              title="Thay ảnh khác"
            >
              {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            </label>
            <button
              type="button"
              onClick={() => onChange("")}
              className="grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white transition hover:bg-[#f52334]"
              title="Bỏ ảnh"
              aria-label="Bỏ ảnh"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {picker}
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-[#fcfbfa] p-4 text-center transition hover:border-[#f52334] hover:bg-red-50/30 ${
            compact ? "min-h-24" : "min-h-36"
          }`}
        >
          {busy ? <LoaderCircle className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6 text-black/45" />}
          <span className="mt-2 text-sm font-semibold">{busy ? "Đang tải ảnh..." : "Chọn ảnh để tải lên"}</span>
          <span className="mt-0.5 text-xs text-black/40">JPG, PNG, WebP, AVIF · tối đa 5 MB</span>
          {picker}
        </label>
      )}

      <button
        type="button"
        onClick={() => setShowUrl((open) => !open)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/45 hover:text-[#f52334]"
      >
        <Link2 className="h-3.5 w-3.5" />
        {showUrl ? "Ẩn đường dẫn ảnh" : "Dán đường dẫn ảnh"}
      </button>
      {showUrl && (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/assets/ten-anh.png hoặc https://..."
          className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-xs outline-none focus:border-[#f52334]"
        />
      )}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
