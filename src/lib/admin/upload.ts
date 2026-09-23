"use client";

import { createClient } from "@/lib/supabase/client";

export const MEDIA_BUCKET = "melalogy-media";
export const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function validateImage(file: File) {
  if (!allowedImageTypes.includes(file.type)) return `${file.name}: chỉ nhận JPG, PNG, WebP hoặc AVIF.`;
  if (file.size > MAX_IMAGE_BYTES) return `${file.name}: ảnh phải nhỏ hơn 5 MB.`;
  return null;
}

/** Uploads to Supabase Storage and returns the public URL + storage path. */
export async function uploadImage(file: File, folder: string) {
  const problem = validateImage(file);
  if (problem) throw new Error(problem);

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, "").replace(/^\/+|\/+$/g, "") || "misc";
  const path = `${safeFolder}/${crypto.randomUUID()}.${extension}`;
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "31536000", contentType: file.type, upsert: false });
  if (error) {
    if (/row-level security|unauthorized|403/i.test(error.message)) {
      throw new Error("Không có quyền tải ảnh lên. Hãy đăng nhập lại bằng tài khoản quản trị.");
    }
    if (/bucket not found/i.test(error.message)) {
      throw new Error("Chưa có kho ảnh melalogy-media trên Supabase. Hãy chạy migration Admin.");
    }
    throw error;
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}
