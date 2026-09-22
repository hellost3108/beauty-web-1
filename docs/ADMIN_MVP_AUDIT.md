# Melalogy Admin MVP — Source Audit

Ngày audit: 26/08/2026

## Hiện trạng source

- Source ban đầu dùng Next.js App Router `16.1.6`; đã nâng lên bản vá bảo mật `16.3.3`. React giữ ở `18.3.1` để tương thích với bộ UI hiện tại.
- Website production build thành công trước khi thêm Admin.
- Source đang deploy từ nhánh `main`; hosting hiện tại là Vercel với domain `melalogy.com`.
- Chưa có database, API backend hoặc Supabase.
- Giỏ hàng và danh sách yêu thích lưu trong `localStorage`; login, signup và checkout hiện mới là giao diện mô phỏng.

## Dữ liệu đang hard-code

| Nhóm dữ liệu | Nguồn hiện tại | Đưa vào Admin MVP |
| --- | --- | --- |
| Sản phẩm | `src/data/productsData.ts` | Có |
| Ảnh sản phẩm | `public/assets` và mảng `images` | Có |
| Danh mục | Tên danh mục nằm trong product/components | Có |
| Hero trang chủ | `src/components/HeroSection.tsx` | Có |
| “Vì sao chọn Melalogy” | `src/components/BeautyDeal.tsx` | Có |
| Blog/Magazine | `src/data/*Blog*`, `src/data/*Magazine*` | Chưa, giữ tĩnh |
| Footer/Contact/Social | Components và views | Chưa, giữ tĩnh |
| Cart/Wishlist | React Context + `localStorage` | Chưa thay đổi nghiệp vụ |
| Checkout/Order/Payment | Giao diện mô phỏng | Ngoài MVP |

## Kiến trúc đã triển khai

```text
Website công khai                /admin
       │                           │
       ├── Public content service  ├── Supabase Auth
       │                           ├── Server Actions + validation
       └────────────┬──────────────┘
                    │
                 Supabase
          PostgreSQL + RLS + Storage
```

- Website công khai đọc Supabase khi có cấu hình.
- Khi Supabase chưa được tạo hoặc tạm lỗi, dữ liệu sản phẩm/homepage cũ vẫn được dùng làm fallback.
- Session Admin lưu bằng cookie SSR và được làm mới bởi Next.js `proxy.ts`.
- Mọi thao tác ghi đều kiểm tra role ở server và tiếp tục bị chặn bởi RLS tại database.
- Upload ảnh đi thẳng từ trình duyệt Admin tới bucket `melalogy-media`; không dùng và không cần Service Role Key.

## Schema MVP

- `profiles`: liên kết `auth.users`, role và trạng thái tài khoản.
- `categories`: danh mục phân cấp, slug, ảnh và thứ tự.
- `products`: nội dung, giá, trạng thái, SEO và danh mục.
- `product_images`: nhiều ảnh cho mỗi sản phẩm, ảnh chính và thứ tự.
- `banners`: hero/promo, ảnh desktop/mobile, CTA và lịch hiển thị.
- `homepage_sections`: các khối nội dung có `section_key` ổn định.
- `site_settings`: cấu hình key/value có cờ công khai.

## Phân quyền

- Khách: chỉ đọc sản phẩm đã xuất bản, danh mục hoạt động, banner đang trong thời gian hiển thị và section đã xuất bản.
- `editor`, `admin`, `super_admin`: quản trị nội dung MVP.
- Chỉ `super_admin`: quản lý role/profile.
- User mới luôn nhận role `customer`; không thể tự đăng ký thành Admin.
- Bucket ảnh là public-read để website hiển thị ảnh, nhưng chỉ Admin hợp lệ mới upload, sửa, liệt kê hoặc xoá.

## Phạm vi Admin đã có

- `/admin/login`
- Dashboard tổng quan
- Product CRUD + draft/published/archive
- Nhiều ảnh sản phẩm, đặt ảnh chính, xoá ảnh
- Category CRUD + ẩn/hiện
- Banner CRUD + upload ảnh desktop/mobile
- CMS khối “Vì sao chọn Melalogy”
- Trang `/admin/setup` khi chưa cấu hình Supabase

## Điểm cần làm sau MVP

- Rich-text editor và kiểm soát HTML an toàn.
- Kéo thả sắp xếp ảnh/banner.
- Audit log cho thay đổi giá và nội dung.
- Media library dùng lại ảnh và dọn file không còn tham chiếu.
- Tách staging Supabase khỏi production khi team bắt đầu vận hành thường xuyên.
- Chuyển Blog/Magazine/Footer/Settings vào CMS nếu có nhu cầu thực tế.
- Order, payment, inventory và customer account là phase riêng.

## Ghi chú kỹ thuật cần theo dõi

- Source cũ đang bật `typescript.ignoreBuildErrors`. MVP được kiểm tra riêng bằng `tsc --noEmit`, nhưng nên bỏ cờ này sau khi xác nhận toàn bộ pipeline Vercel.
- Script `next lint` thuộc cấu hình Next.js cũ và không còn là phép kiểm tra chính cho Next.js 16.
- Cart/Wishlist vẫn là dữ liệu theo thiết bị, phù hợp với phạm vi hiện tại nhưng chưa phải dữ liệu thương mại đáng tin cậy.
- Audit dependency production sau khi nâng phiên bản: `0` cảnh báo đã biết từ npm audit.
