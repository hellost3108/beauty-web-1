"use client";

import { useState } from "react";
import { ImagePlus, LoaderCircle, Star, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ProductImage = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
};

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export default function ProductImagesManager({
  productId,
  initialImages,
}: {
  productId: number;
  initialImages: ProductImage[];
}) {
  const [images, setImages] = useState(initialImages);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    const supabase = createClient();

    try {
      const nextImages = [...images];
      for (const file of Array.from(files)) {
        if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name}: định dạng không hợp lệ hoặc lớn hơn 5 MB.`);
        }

        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const storagePath = `products/${productId}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("melalogy-media")
          .upload(storagePath, file, { cacheControl: "31536000", contentType: file.type });
        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage.from("melalogy-media").getPublicUrl(storagePath);
        const { data: inserted, error: insertError } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            storage_path: storagePath,
            image_url: publicUrl.publicUrl,
            alt_text: file.name.replace(/\.[^.]+$/, ""),
            sort_order: nextImages.length * 10,
            is_primary: nextImages.length === 0,
          })
          .select("id, image_url, storage_path, alt_text, sort_order, is_primary")
          .single();
        if (insertError) throw insertError;
        nextImages.push(inserted as ProductImage);
      }
      setImages(nextImages);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Không thể upload ảnh.");
    } finally {
      setBusy(false);
    }
  };

  const makePrimary = async (id: string) => {
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: clearError } = await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", productId);
    const { error: primaryError } = clearError
      ? { error: clearError }
      : await supabase.from("product_images").update({ is_primary: true }).eq("id", id);
    if (primaryError) setError(primaryError.message);
    else setImages((current) => current.map((image) => ({ ...image, is_primary: image.id === id })));
    setBusy(false);
  };

  const remove = async (image: ProductImage) => {
    setBusy(true);
    setError("");
    const supabase = createClient();
    if (image.storage_path) {
      const { error: storageError } = await supabase.storage
        .from("melalogy-media")
        .remove([image.storage_path]);
      if (storageError) {
        setError(storageError.message);
        setBusy(false);
        return;
      }
    }

    const { error: deleteError } = await supabase.from("product_images").delete().eq("id", image.id);
    if (deleteError) setError(deleteError.message);
    else {
      const remaining = images.filter((item) => item.id !== image.id);
      setImages(remaining);
      if (image.is_primary && remaining[0]) await makePrimary(remaining[0].id);
    }
    setBusy(false);
  };

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Hình ảnh sản phẩm</h2>
          <p className="mt-1 text-sm text-black/50">Ảnh có dấu sao được dùng làm ảnh đại diện.</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#191716] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#f52334]">
          {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          Tải ảnh lên
          <input
            type="file"
            multiple
            accept={allowedTypes.join(",")}
            disabled={busy}
            className="sr-only"
            onChange={(event) => void uploadFiles(event.target.files)}
          />
        </label>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <article key={image.id} className="overflow-hidden rounded-2xl border border-black/10 bg-[#f6f3ef]">
              <img src={image.image_url} alt={image.alt_text || "Ảnh sản phẩm"} className="h-52 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <button
                  type="button"
                  disabled={busy || image.is_primary}
                  onClick={() => void makePrimary(image.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                    image.is_primary ? "bg-amber-100 text-amber-800" : "bg-white text-black/60"
                  }`}
                >
                  <Star className={`h-3.5 w-3.5 ${image.is_primary ? "fill-current" : ""}`} />
                  {image.is_primary ? "Ảnh chính" : "Đặt làm ảnh chính"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void remove(image)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-red-600"
                  aria-label="Xoá ảnh"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center text-sm text-black/45">
          Sản phẩm chưa có ảnh.
        </div>
      )}
      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
    </section>
  );
}
