"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminForAction } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import {
  aboutPageSchema,
  articleSchema,
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

export async function upsertArticle(formData: FormData) {
  await requireAdminForAction();
  const values = articleSchema.parse({
    id: text(formData, "id"),
    channel: text(formData, "channel"),
    title: text(formData, "title"),
    slug: text(formData, "slug"),
    seoTitle: text(formData, "seo_title"),
    metaDescription: text(formData, "meta_description"),
    keywords: text(formData, "keywords"),
    subtitle: text(formData, "subtitle"),
    excerpt: text(formData, "excerpt"),
    author: text(formData, "author"),
    authorRole: text(formData, "author_role"),
    dateLabel: text(formData, "date_label"),
    publishedAt: text(formData, "published_at"),
    category: text(formData, "category"),
    imageUrl: text(formData, "image_url"),
    imageAlt: text(formData, "image_alt"),
    readingTime: text(formData, "reading_time"),
    contentHtml: text(formData, "content_html"),
    status: text(formData, "status"),
    featured: checked(formData, "featured"),
    sortOrder: text(formData, "sort_order"),
  });

  const publishedAt = values.publishedAt
    ? new Date(values.publishedAt).toISOString()
    : values.status === "published"
      ? new Date().toISOString()
      : null;
  const payload = {
    channel: values.channel,
    title: values.title,
    slug: values.slug,
    seo_title: values.seoTitle,
    meta_description: values.metaDescription,
    keywords: values.keywords
      ? values.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
      : [],
    subtitle: values.subtitle,
    excerpt: values.excerpt,
    author: values.author,
    author_role: values.authorRole,
    date_label: values.dateLabel,
    published_at: publishedAt,
    category: values.category,
    image_url: values.imageUrl,
    image_alt: values.imageAlt,
    reading_time: values.readingTime,
    content_html: values.contentHtml,
    status: values.status,
    featured: values.featured,
    sort_order: values.sortOrder,
  };

  const supabase = await createClient();
  const result = values.id
    ? await supabase.from("articles").update(payload).eq("id", values.id).select("id").single()
    : await supabase.from("articles").insert(payload).select("id").single();

  const section = values.channel === "blog" ? "blog" : "magazine";
  if (result.error) {
    const target = values.id
      ? `/admin/${section}/${values.id}/edit`
      : `/admin/${section}/new`;
    redirect(`${target}?error=${encodeURIComponent(result.error.message)}`);
  }

  revalidatePath(`/admin/${section}`);
  revalidatePath(`/${section}`, "layout");
  redirect(`/admin/${section}/${result.data.id}/edit?success=saved`);
}

export async function archiveArticle(formData: FormData) {
  await requireAdminForAction();
  const id = Number(text(formData, "id"));
  const channel = text(formData, "channel");
  if (!Number.isInteger(id) || !["blog", "magazine"].includes(channel)) {
    throw new Error("Bài viết không hợp lệ.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("articles").update({ status: "archived" }).eq("id", id);
  if (error) throw error;
  revalidatePath(`/admin/${channel}`);
  revalidatePath(`/${channel}`, "layout");
}

export async function upsertAboutPage(formData: FormData) {
  await requireAdminForAction();
  const value = (key: string) => text(formData, key);
  const values = aboutPageSchema.parse({
    heroEyebrow: value("hero_eyebrow"),
    heroTitle: value("hero_title"),
    heroHighlightedText: value("hero_highlighted_text"),
    heroBody: value("hero_body"),
    heroImageUrl: value("hero_image_url"),
    heroImageAlt: value("hero_image_alt"),
    heroImageCaption: value("hero_image_caption"),
    premiseEyebrow: value("premise_eyebrow"),
    premiseTitle: value("premise_title"),
    premiseHighlightedText: value("premise_highlighted_text"),
    signalTitle: value("signal_title"),
    signalBody: value("signal_body"),
    answerTitle: value("answer_title"),
    answerBody: value("answer_body"),
    thinkingEyebrow: value("thinking_eyebrow"),
    thinkingTitle: value("thinking_title"),
    thinkingBody: value("thinking_body"),
    thinkingImageUrl: value("thinking_image_url"),
    thinkingImageAlt: value("thinking_image_alt"),
    principle1Title: value("principle_1_title"),
    principle1Body: value("principle_1_body"),
    principle2Title: value("principle_2_title"),
    principle2Body: value("principle_2_body"),
    principle3Title: value("principle_3_title"),
    principle3Body: value("principle_3_body"),
    collectionEyebrow: value("collection_eyebrow"),
    collectionTitle: value("collection_title"),
    collectionBody: value("collection_body"),
    valuesEyebrow: value("values_eyebrow"),
    valuesTitle: value("values_title"),
    value1Title: value("value_1_title"),
    value1Body: value("value_1_body"),
    value2Title: value("value_2_title"),
    value2Body: value("value_2_body"),
    value3Title: value("value_3_title"),
    value3Body: value("value_3_body"),
    ctaEyebrow: value("cta_eyebrow"),
    ctaTitle: value("cta_title"),
    ctaButtonLabel: value("cta_button_label"),
    ctaButtonUrl: value("cta_button_url"),
    seoTitle: value("seo_title"),
    seoDescription: value("seo_description"),
    status: value("status"),
  });

  const content = {
    hero: {
      eyebrow: values.heroEyebrow,
      title: values.heroTitle,
      highlightedText: values.heroHighlightedText,
      body: values.heroBody,
      imageUrl: values.heroImageUrl,
      imageAlt: values.heroImageAlt,
      imageCaption: values.heroImageCaption,
    },
    premise: {
      eyebrow: values.premiseEyebrow,
      title: values.premiseTitle,
      highlightedText: values.premiseHighlightedText,
      signalTitle: values.signalTitle,
      signalBody: values.signalBody,
      answerTitle: values.answerTitle,
      answerBody: values.answerBody,
    },
    thinking: {
      eyebrow: values.thinkingEyebrow,
      title: values.thinkingTitle,
      body: values.thinkingBody,
      imageUrl: values.thinkingImageUrl,
      imageAlt: values.thinkingImageAlt,
      principles: [
        { title: values.principle1Title, body: values.principle1Body },
        { title: values.principle2Title, body: values.principle2Body },
        { title: values.principle3Title, body: values.principle3Body },
      ],
    },
    collection: {
      eyebrow: values.collectionEyebrow,
      title: values.collectionTitle,
      body: values.collectionBody,
    },
    values: {
      eyebrow: values.valuesEyebrow,
      title: values.valuesTitle,
      items: [
        { title: values.value1Title, body: values.value1Body },
        { title: values.value2Title, body: values.value2Body },
        { title: values.value3Title, body: values.value3Body },
      ],
    },
    cta: {
      eyebrow: values.ctaEyebrow,
      title: values.ctaTitle,
      buttonLabel: values.ctaButtonLabel,
      buttonUrl: values.ctaButtonUrl,
    },
  };

  const supabase = await createClient();
  const { error } = await supabase.from("content_pages").upsert(
    {
      slug: "about",
      title: "Giới thiệu Melalogy",
      seo_title: values.seoTitle,
      seo_description: values.seoDescription,
      content,
      status: values.status,
    },
    { onConflict: "slug" },
  );
  if (error) redirect(`/admin/about?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/about");
  revalidatePath("/about");
  redirect("/admin/about?success=saved");
}
