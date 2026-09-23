"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, ImagePlus, LoaderCircle, Star, Trash2 } from "lucide-react";
import { refreshProductImages } from "@/app/admin/_actions/catalog";
import { Card, buttonClass } from "@/components/admin/ui";
import { MEDIA_BUCKET, allowedImageTypes, uploadImage } from "@/lib/admin/upload";
import { createClient } from "@/lib/supabase/client";

export type ProductImage = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
};

const columns = "id, image_url, storage_path, alt_text, sort_order, is_primary";

export default function ProductImagesManager({
  productId,
  productName,
  initialImages,
}: {
  productId: number;
  productName: string;
  initialImages: ProductImage[];
}) {
  const [images, setImages] = useState(() =>
    [...initialImages].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order),
  );
  const [busy, setBusy] = useState(false);

  /** Runs a change, then refreshes the storefront cache. */
  const withBusy = async (task: () => Promise<void>, success?: string) => {
    setBusy(true);
    try {
      await task();
      const refreshed = await refreshProductImages();
      if (!refreshed.ok) throw new Error(refreshed.error);
      if (success) toast.success(success);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật ảnh.");
    } finally {
      setBusy(false);
    }
  };

  const uploadFiles = (files: FileList | null) =>
    withBusy(async () => {
      if (!files?.length) return;
      const supabase = createClient();
      const next = [...images];
      for (const file of Array.from(files)) {
        const { url, path } = await uploadImage(file, `products/${productId}`);
        const { data, error } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            storage_path: path,
            image_url: url,
            alt_text: productName,
            sort_order: (next.at(-1)?.sort_order ?? -10) + 10,
            is_primary: next.length === 0,
          })
          .select(columns)
          .single();
        if (error) throw error;
        next.push(data as ProductImage);
      }
      setImages(next);
    }, "Đã tải ảnh lên.");

  const makePrimary = (id: string) =>
    withBusy(async () => {
      const supabase = createClient();
      const { error: clearError } = await supabase.from("product_images").update({ is_primary: false }).eq("product_id", productId);
      if (clearError) throw clearError;
      const { error } = await supabase.from("product_images").update({ is_primary: true }).eq("id", id);
      if (error) throw error;
      setImages((current) => {
        const updated = current.map((image) => ({ ...image, is_primary: image.id === id }));
        return [...updated.filter((image) => image.is_primary), ...updated.filter((image) => !image.is_primary)];
      });
    }, "Đã đổi ảnh đại diện.");

  const move = (index: number, direction: -1 | 1) =>
    withBusy(async () => {
      const target = index + direction;
      if (target < 0 || target >= images.length) return;
      const next = [...images];
      [next[index], next[target]] = [next[target], next[index]];
      const ordered = next.map((image, position) => ({ ...image, sort_order: position * 10 }));
      const supabase = createClient();
      for (const image of ordered) {
        const { error } = await supabase.from("product_images").update({ sort_order: image.sort_order }).eq("id", image.id);
        if (error) throw error;
      }
      setImages(ordered);
    });

  const saveAlt = (image: ProductImage, altText: string) =>
    altText === (image.alt_text ?? "")
      ? Promise.resolve()
      : withBusy(async () => {
          const supabase = createClient();
          const { error } = await supabase.from("product_images").update({ alt_text: altText }).eq("id", image.id);
          if (error) throw error;
          setImages((current) => current.map((item) => (item.id === image.id ? { ...item, alt_text: altText } : item)));
        });

  const remove = (image: ProductImage) => {
    if (!window.confirm("Xoá ảnh này khỏi sản phẩm?")) return;
    void withBusy(async () => {
      const supabase = createClient();
      const { error } = await supabase.from("product_images").delete().eq("id", image.id);
      if (error) throw error;
      if (image.storage_path) {
        await supabase.storage.from(MEDIA_BUCKET).remove([image.storage_path]);
      }
      const remaining = images.filter((item) => item.id !== image.id);
      if (image.is_primary && remaining[0]) {
        const { error: primaryError } = await supabase.from("product_images").update({ is_primary: true }).eq("id", remaining[0].id);
        if (primaryError) throw primaryError;
        remaining[0] = { ...remaining[0], is_primary: true };
      }
      setImages(remaining);
    }, "Đã xoá ảnh.");
  };

  return (
    <Card>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Hình ảnh sản phẩm</h2>
          <p className="mt-1 text-sm text-black/50">
            Ảnh có dấu sao là ảnh đại diện; ảnh thứ hai hiện khi rê chuột trên trang Shop. Thay đổi ảnh được áp dụng ngay.
          </p>
        </div>
        <label className={`${buttonClass.dark} cursor-pointer`}>
          {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          Tải ảnh lên
          <input
            type="file"
            multiple
            accept={allowedImageTypes.join(",")}
            disabled={busy}
            className="sr-only"
            onChange={(event) => {
              void uploadFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {images.map((image, index) => (
            <article key={image.id} className="overflow-hidden rounded-2xl border border-black/10 bg-[#f6f3ef]">
              <div className="relative">
                <img src={image.image_url} alt={image.alt_text || "Ảnh sản phẩm"} className="h-48 w-full object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">{index + 1}</span>
              </div>
              <div className="space-y-2 p-3">
                <input
                  defaultValue={image.alt_text ?? ""}
                  placeholder="Mô tả ảnh (SEO)"
                  onBlur={(event) => void saveAlt(image, event.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#f52334]"
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    disabled={busy || image.is_primary}
                    onClick={() => void makePrimary(image.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      image.is_primary ? "bg-amber-100 text-amber-800" : "bg-white text-black/60 hover:text-[#f52334]"
                    }`}
                  >
                    <Star className={`h-3.5 w-3.5 ${image.is_primary ? "fill-current" : ""}`} />
                    {image.is_primary ? "Ảnh chính" : "Đặt ảnh chính"}
                  </button>
                  <div className="flex gap-1">
                    <button type="button" className={buttonClass.icon} disabled={busy || index === 0} onClick={() => void move(index, -1)} aria-label="Sang trái">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className={buttonClass.icon} disabled={busy || index === images.length - 1} onClick={() => void move(index, 1)} aria-label="Sang phải">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className={`${buttonClass.icon} hover:border-red-300 hover:text-red-600`} disabled={busy} onClick={() => remove(image)} aria-label="Xoá ảnh">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center text-sm text-black/45">
          Sản phẩm chưa có ảnh — website sẽ hiển thị ảnh tạm.
        </div>
      )}
    </Card>
  );
}
