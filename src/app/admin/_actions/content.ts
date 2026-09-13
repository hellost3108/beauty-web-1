"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminForAction } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import {
  bannerSchema,
  categorySchema,
  homepageSectionSchema,
  productSchema,
} from "@/lib/validation/admin";

const text = (formData: FormData, key: string) => formData.get(key)?.toString() ?? "";
const checked = (formData: FormData, key: string) => formData.get(key) === "on";

export async function upsertProduct(formData: FormData) {
  await requireAdminForAction();
  const values = productSchema.parse({
    id: text(formData, "id"),
    categoryId: text(formData, "category_id"),
    name: text(formData, "name"),
    slug: text(formData, "slug"),
    sku: text(formData, "sku"),
    subtitle: text(formData, "subtitle"),
    shortDescription: text(formData, "short_description"),
    description: text(formData, "description"),
    ingredients: text(formData, "ingredients"),
    usage: text(formData, "usage"),
    price: text(formData, "price"),
    compareAtPrice: text(formData, "compare_at_price"),
    status: text(formData, "status"),
    featured: checked(formData, "featured"),
    sortOrder: text(formData, "sort_order"),
    seoTitle: text(formData, "seo_title"),
    seoDescription: text(formData, "seo_description"),
  });

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

  if (result.error) {
    const target = values.id ? `/admin/products/${values.id}/edit` : "/admin/products/new";
    redirect(`${target}?error=${encodeURIComponent(result.error.message)}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/collection");
  redirect(`/admin/products/${result.data.id}/edit?success=saved`);
}

export async function archiveProduct(formData: FormData) {
  await requireAdminForAction();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Sản phẩm không hợp lệ.");

  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ status: "archived" }).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/products");
  revalidatePath("/collection");
}

export async function upsertCategory(formData: FormData) {
  await requireAdminForAction();
  const values = categorySchema.parse({
    id: text(formData, "id"),
    parentId: text(formData, "parent_id"),
    name: text(formData, "name"),
    slug: text(formData, "slug"),
    description: text(formData, "description"),
    imageUrl: text(formData, "image_url"),
    isActive: checked(formData, "is_active"),
    sortOrder: text(formData, "sort_order"),
  });

  const payload = {
    parent_id: values.parentId,
    name: values.name,
    slug: values.slug,
    description: values.description,
    image_url: values.imageUrl,
    is_active: values.isActive,
    sort_order: values.sortOrder,
  };

  const supabase = await createClient();
  const result = values.id
    ? await supabase.from("categories").update(payload).eq("id", values.id)
    : await supabase.from("categories").insert(payload);
  if (result.error) redirect(`/admin/categories?error=${encodeURIComponent(result.error.message)}`);

  revalidatePath("/admin/categories");
  revalidatePath("/collection");
  redirect("/admin/categories?success=saved");
}

export async function deactivateCategory(formData: FormData) {
  await requireAdminForAction();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Danh mục không hợp lệ.");

  const supabase = await createClient();
  const { error } = await supabase.from("categories").update({ is_active: false }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categories");
}

export async function upsertBanner(formData: FormData) {
  await requireAdminForAction();
  const values = bannerSchema.parse({
    id: text(formData, "id"),
    name: text(formData, "name"),
    placement: text(formData, "placement"),
    eyebrow: text(formData, "eyebrow"),
    title: text(formData, "title"),
    highlightedText: text(formData, "highlighted_text"),
    subtitle: text(formData, "subtitle"),
    desktopImageUrl: text(formData, "desktop_image_url"),
    mobileImageUrl: text(formData, "mobile_image_url"),
    buttonLabel: text(formData, "button_label"),
    buttonUrl: text(formData, "button_url"),
    secondaryButtonLabel: text(formData, "secondary_button_label"),
    secondaryButtonUrl: text(formData, "secondary_button_url"),
    status: text(formData, "status"),
    sortOrder: text(formData, "sort_order"),
  });

  const payload = {
    name: values.name,
    placement: values.placement,
    eyebrow: values.eyebrow,
    title: values.title,
    highlighted_text: values.highlightedText,
    subtitle: values.subtitle,
    desktop_image_url: values.desktopImageUrl,
    mobile_image_url: values.mobileImageUrl,
    button_label: values.buttonLabel,
    button_url: values.buttonUrl,
    secondary_button_label: values.secondaryButtonLabel,
    secondary_button_url: values.secondaryButtonUrl,
    status: values.status,
    sort_order: values.sortOrder,
  };

  const supabase = await createClient();
  const result = values.id
    ? await supabase.from("banners").update(payload).eq("id", values.id).select("id").single()
    : await supabase.from("banners").insert(payload).select("id").single();

  if (result.error) {
    const target = values.id ? `/admin/banners/${values.id}/edit` : "/admin/banners/new";
    redirect(`${target}?error=${encodeURIComponent(result.error.message)}`);
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect(`/admin/banners/${result.data.id}/edit?success=saved`);
}

export async function archiveBanner(formData: FormData) {
  await requireAdminForAction();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Banner không hợp lệ.");

  const supabase = await createClient();
  const { error } = await supabase.from("banners").update({ status: "archived" }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function upsertHomepageSection(formData: FormData) {
  await requireAdminForAction();
  const values = homepageSectionSchema.parse({
    id: text(formData, "id"),
    sectionKey: text(formData, "section_key"),
    eyebrow: text(formData, "eyebrow"),
    title: text(formData, "title"),
    highlightedText: text(formData, "highlighted_text"),
    subtitle: text(formData, "subtitle"),
    body: text(formData, "body"),
    imageUrl: text(formData, "image_url"),
    ctaLabel: text(formData, "cta_label"),
    ctaUrl: text(formData, "cta_url"),
    status: text(formData, "status"),
    sortOrder: text(formData, "sort_order"),
  });

  const payload = {
    section_key: values.sectionKey,
    eyebrow: values.eyebrow,
    title: values.title,
    highlighted_text: values.highlightedText,
    subtitle: values.subtitle,
    body: values.body,
    image_url: values.imageUrl,
    cta_label: values.ctaLabel,
    cta_url: values.ctaUrl,
    status: values.status,
    sort_order: values.sortOrder,
  };

  const supabase = await createClient();
  const result = values.id
    ? await supabase.from("homepage_sections").update(payload).eq("id", values.id)
    : await supabase.from("homepage_sections").insert(payload);
  if (result.error) redirect(`/admin/homepage?error=${encodeURIComponent(result.error.message)}`);

  revalidatePath("/admin/homepage");
  revalidatePath("/");
  redirect("/admin/homepage?success=saved");
}
