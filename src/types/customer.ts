export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "completed" | "cancelled";
export type PaymentMethod = "cod" | "bank_transfer";
export type PaymentStatus = "unpaid" | "awaiting_confirmation" | "paid" | "refunded";

export interface CustomerProfile {
  id: string;
  email: string;
  fullName: string | null;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  note: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItemRecord {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface OrderRecord {
  id: number;
  order_code: string;
  user_id: string | null;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_fee: number;
  total: number;
  shipping_full_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_ward: string;
  shipping_district: string;
  shipping_city: string;
  shipping_note: string | null;
  created_at: string;
  order_items?: OrderItemRecord[];
}

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  processing: "Đang chuẩn bị",
  shipped: "Đang giao",
  completed: "Hoàn tất",
  cancelled: "Đã huỷ",
};

export const paymentMethodLabel: Record<PaymentMethod, string> = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank_transfer: "Chuyển khoản ngân hàng",
};

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  unpaid: "Chưa thanh toán",
  awaiting_confirmation: "Chờ xác nhận chuyển khoản",
  paid: "Đã thanh toán",
  refunded: "Đã hoàn tiền",
};
