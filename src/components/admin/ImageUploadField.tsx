"use client";

import { useState } from "react";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export default function ImageUploadField({
  name,
  label,
  folder,
  initialValue = "",
  required = false,
}: {
  name: string;
  label: string;
  folder: string;
  initialValue?: string | null;
  required?: boolean;
}) {
  const [value, setValue] = useState(initialValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file?: File) => {
    if (!file) return;
    setError("");
    if (!allowedTypes.includes(file.type)) {
      setError("Chỉ nhận JPG, PNG, WebP hoặc AVIF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ảnh phải nhỏ hơn 5 MB.");
      return;
    }

    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${extension}`;
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from("melalogy-media")
        .upload(path, file, { cacheControl: "31536000", contentType: file.type });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("melalogy-media").getPublicUrl(path);
      setValue(data.publicUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Không thể upload ảnh.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-black/70">{label}</label>
      <input type="hidden" name={name} value={value} required={required} />
      {value ? (
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#eee9e4]">
          <img src={value} alt="Ảnh đã chọn" className="h-52 w-full object-cover" />
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white"
            aria-label="Bỏ ảnh"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-white p-6 text-center transition hover:border-[#f52334] hover:bg-red-50/30">
          {busy ? <LoaderCircle className="h-7 w-7 animate-spin" /> : <ImagePlus className="h-7 w-7" />}
          <span className="mt-3 text-sm font-semibold">{busy ? "Đang tải ảnh..." : "Chọn ảnh để tải lên"}</span>
          <span className="mt-1 text-xs text-black/45">JPG, PNG, WebP, AVIF · tối đa 5 MB</span>
          <input
            type="file"
            accept={allowedTypes.join(",")}
            className="sr-only"
            disabled={busy}
            onChange={(event) => void upload(event.target.files?.[0])}
          />
        </label>
      )}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
