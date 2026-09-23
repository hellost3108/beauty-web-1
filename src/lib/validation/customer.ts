import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().uuid().optional(),
  full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+()\s-]+$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(4, "Địa chỉ phải có ít nhất 4 ký tự"),
  ward: z.string().optional().default(""),
  district: z.string().optional().default(""),
  city: z.string().min(1, "Vui lòng nhập tỉnh/thành phố"),
  note: z.string().optional().default(""),
  is_default: z.boolean().optional().default(false),
});

export const checkoutItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+()\s-]+$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(4, "Địa chỉ phải có ít nhất 4 ký tự"),
  ward: z.string().optional().default(""),
  district: z.string().optional().default(""),
  city: z.string().min(1, "Vui lòng nhập tỉnh/thành phố"),
  note: z.string().optional().default(""),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
  saveAddress: z.boolean().optional().default(false),
  items: z.array(checkoutItemSchema).min(1, "Giỏ hàng đang trống"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
