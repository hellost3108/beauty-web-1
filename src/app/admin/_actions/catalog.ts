"use server";

import { friendlyError, refreshPublicSite } from "@/lib/admin/server-utils";
import { requireModuleForAction } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import { categorySchema, firstIssue, productSchema } from "@/lib/validation/admin";
import type { ActionResult, PublicationStatus } from "@/types/cms";

export async function saveProduct(input: unknown): Promise<ActionResult<{ id: number }>> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const values = parsed.data;

  try {
    await requireModuleForAction("products");
    const payload = {
      category_id: values.categoryId,
      name: values.name,
      slug: values.slug,
      sku: values.sku,
      subtitle: values.subtitle,
      short_description: values.shortDescription,
      description: values.description,
      ingredients: values.ingredients,
      usage: values.usage,
      actives: values.actives,
      formula_note: values.formulaNote,
      accent_color: values.accentColor,
      price: values.price,
      compare_at_price: values.compareAtPrice,
      status: values.status,
      featured: values.featured,
      sort_order: values.sortOrder,
      seo_title: values.seoTitle,
      seo_description: values.seoDescription,
    };

    const supabase = await createClient();
    const result = values.id
      ? await supabase.from("products").update(payload).eq("id", values.id).select("id").single()
      : await supabase.from("products").insert(payload).select("id").single();
    if (result.error) throw result.error;

    refreshPublicSite(["products"]);
    return { ok: true, data: { id: result.data.id }, message: "Đã lưu sản phẩm." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

export async function setProductStatus(id: number, status: PublicationStatus): Promise<ActionResult> {
  if (!Number.isInteger(id) || !["draft", "published", "archived"].includes(status)) {
    return { ok: false, error: "Dữ liệu không hợp lệ." };
  }
  try {
    await requireModuleForAction("products");
    const supabase = await createClient();
    const { error } = await supabase.from("products").update({ status }).eq("id", id);
    if (error) throw error;
    refreshPublicSite(["products"]);
    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/** Called by the image manager after it changes product_images directly. */
export async function refreshProductImages(): Promise<ActionResult> {
  try {
    await requireModuleForAction("products");
    refreshPublicSite(["products"]);
    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

export async function saveCategory(input: unknown): Promise<ActionResult<{ id: number }>> {
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const values = parsed.data;

  try {
    await requireModuleForAction("products");
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      image_url: values.imageUrl || null,
      is_active: values.isActive,
      sort_order: values.sortOrder,
    };
    const supabase = await createClient();
    const result = values.id
      ? await supabase.from("categories").update(payload).eq("id", values.id).select("id").single()
      : await supabase.from("categories").insert(payload).select("id").single();
    if (result.error) throw result.error;

    refreshPublicSite(["products"]);
    return { ok: true, data: { id: result.data.id }, message: "Đã lưu danh mục." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/**
 * Permanently deletes a product and its images. Past orders keep their own
 * copy of the name, image and price (order_items.product_id becomes null).
 */
export async function deleteProduct(id: number): Promise<ActionResult> {
  if (!Number.isInteger(id)) return { ok: false, error: "Sản phẩm không hợp lệ." };
  try {
    await requireModuleForAction("products");
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").delete().eq("id", id).select("id");
    if (error) throw error;
    if (!data?.length) return { ok: false, error: "Không xoá được sản phẩm (không tồn tại hoặc không có quyền)." };
    refreshPublicSite(["products"]);
    return { ok: true, data: undefined, message: "Đã xoá sản phẩm." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}
