import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thông tin giao nhận',
  description: 'Nhập thông tin giao nhận cho đơn hàng Melalogy.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShippingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
