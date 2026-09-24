"use client";

import { allowedImageTypes } from "./upload";

const MAX_SIDE = 2400;
const TARGET_BYTES = 1.8 * 1024 * 1024;

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Không đọc được ảnh."));
    };
    image.src = url;
  });
}

/**
 * Makes pasted/dropped images web-friendly before upload: converts formats
 * the storage bucket does not accept (GIF, BMP…) and shrinks very large
 * pictures (Word often embeds multi-MB PNGs) to WebP, max 2400 px.
 */
export async function prepareImageFile(file: File): Promise<File> {
  const accepted = allowedImageTypes.includes(file.type);
  if (accepted && file.size <= TARGET_BYTES) return file;

  const image = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  if (accepted && scale === 1 && file.size <= 5 * 1024 * 1024 && file.type !== "image/png") return file;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(image, 0, 0, width, height);

  for (const quality of [0.86, 0.75, 0.6]) {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
    if (blob && (blob.size <= TARGET_BYTES || quality === 0.6)) {
      if (accepted && blob.size >= file.size) return file;
      return new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "image"}.webp`, { type: "image/webp" });
    }
  }
  return file;
}
