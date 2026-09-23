"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { addressSchema, checkoutSchema } from "@/lib/validation/customer";
import type { OrderRecord } from "@/types/customer";

function randomOrderCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `MEL-${stamp}${rand}`;
}

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

async function requireUserId() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub as string | undefined;
  if (!userId) throw new Error("Bạn cần đăng nhập để thực hiện thao tác này.");
  return { supabase, userId };
}

export async function upsertAddress(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = addressSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }

  try {
    const { supabase, userId } = await requireUserId();
    const { id, ...rest } = parsed.data;

    if (rest.is_default) {
      await supabase.from("addresses").update({ is_default: false }).eq("user_id", userId);
    }

    const payload = { ...rest, user_id: userId };
    const query = id
      ? supabase.from("addresses").update(payload).eq("id", id).eq("user_id", userId).select("id").single()
      : supabase.from("addresses").insert(payload).select("id").single();

    const { data, error } = await query;
    if (error) throw error;

    revalidatePath("/account");
    return { ok: true, data: { id: data.id as string } };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Không thể lưu địa chỉ." };
  }
}

export async function deleteAddress(id: string): Promise<ActionResult> {
  try {
    const { supabase, userId } = await requireUserId();
    const { error } = await supabase.from("addresses").delete().eq("id", id).eq("user_id", userId);
    if (error) throw error;
    revalidatePath("/account");
    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Không thể xoá địa chỉ." };
  }
}

export async function setDefaultAddress(id: string): Promise<ActionResult> {
  try {
    const { supabase, userId } = await requireUserId();
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", userId);
    const { error } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id)
      .eq("user_id", userId);
    if (error) throw error;
    revalidatePath("/account");
    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Không thể đặt địa chỉ mặc định." };
  }
}

export async function updateProfileName(fullName: string): Promise<ActionResult> {
  try {
    const { supabase, userId } = await requireUserId();
    const trimmed = fullName.trim();
    if (trimmed.length < 2) return { ok: false, error: "Họ tên phải có ít nhất 2 ký tự." };
    const { error } = await supabase.from("profiles").update({ full_name: trimmed }).eq("id", userId);
    if (error) throw error;
    revalidatePath("/account");
    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Không thể cập nhật thông tin." };
  }
}

export async function createOrder(input: unknown): Promise<ActionResult<{ orderCode: string }>> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu đặt hàng không hợp lệ." };
  }

  try {
    const { supabase, userId } = await requireUserId();
    const { items, paymentMethod, saveAddress, ...shipping } = parsed.data;

    const productIds = items.map((item) => item.productId);
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, status, product_images(image_url, is_primary)")
      .in("id", productIds)
      .eq("status", "published");
    if (productsError) throw productsError;

    if (!products || products.length === 0) {
      return { ok: false, error: "Sản phẩm trong giỏ hàng không còn khả dụng." };
    }

    const productMap = new Map(products.map((product) => [product.id, product]));
    let subtotal = 0;
    const orderItemsPayload: Array<{
      product_id: number;
      product_name: string;
      product_image: string | null;
      unit_price: number;
      quantity: number;
      line_total: number;
    }> = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) continue;
      const images = (product.product_images ?? []) as Array<{ image_url: string; is_primary: boolean }>;
      const primaryImage = images.find((image) => image.is_primary)?.image_url ?? images[0]?.image_url ?? null;
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      orderItemsPayload.push({
        product_id: product.id,
        product_name: product.name,
        product_image: primaryImage,
        unit_price: product.price,
        quantity: item.quantity,
        line_total: lineTotal,
      });
    }

    if (orderItemsPayload.length === 0) {
      return { ok: false, error: "Sản phẩm trong giỏ hàng không còn khả dụng." };
    }

    const shippingFee = 0;
    const total = subtotal + shippingFee;
    const orderCode = randomOrderCode();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_code: orderCode,
        user_id: userId,
        payment_method: paymentMethod,
        payment_status: "unpaid",
        subtotal,
        shipping_fee: shippingFee,
        total,
        shipping_full_name: shipping.fullName,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_ward: shipping.ward,
        shipping_district: shipping.district,
        shipping_city: shipping.city,
        shipping_note: shipping.note || null,
      })
      .select("id, order_code")
      .single();
    if (orderError) throw orderError;

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload.map((item) => ({ ...item, order_id: order.id })));
    if (itemsError) throw itemsError;

    if (saveAddress) {
      await supabase.from("addresses").insert({
        user_id: userId,
        full_name: shipping.fullName,
        phone: shipping.phone,
        address: shipping.address,
        ward: shipping.ward,
        district: shipping.district,
        city: shipping.city,
        note: shipping.note || null,
        is_default: false,
      });
    }

    revalidatePath("/account");
    return { ok: true, data: { orderCode: order.order_code as string } };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Không thể tạo đơn hàng." };
  }
}

export async function listMyOrders(): Promise<OrderRecord[]> {
  try {
    const { supabase, userId } = await requireUserId();
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as OrderRecord[];
  } catch {
    return [];
  }
}
