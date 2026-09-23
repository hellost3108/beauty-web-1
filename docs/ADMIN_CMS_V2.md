# Melalogy Admin — CMS v2

## Vì sao phải làm lại

Admin cũ (08–09/2026) ghi dữ liệu vào Supabase nhưng **website công khai không đọc lại dữ liệu đó**:

- Trang chủ, Melanin Science, Shop, FAQ, chính sách… đọc chữ viết cứng trong component.
- Banner trang chủ đọc `localStorage` của trình duyệt (chỉ người sửa thấy thay đổi).
- Sản phẩm và bài viết đọc file `src/data/*.ts`.
- Trang “Giới thiệu” trong Admin sửa một trang (`/about`) đã bị chuyển hướng sang `/melanin-science`.
- Form ném lỗi (crash trang) khi dữ liệu không hợp lệ; slug bài viết cũ (`1`, `2`…) không lưu được vì yêu cầu tối thiểu 2 ký tự; giờ xuất bản bị lệch 7 tiếng mỗi lần lưu; ảnh sản phẩm thay đổi không làm mới cache website.

## Kiến trúc mới

```text
Admin (/admin)                         Website công khai
  │ server actions (kiểm tra quyền)      │ layout + page (server)
  │ + RLS Postgres (can_edit)            │   getSectionRows / getStorefrontProducts / getArticles
  ▼                                      │   (unstable_cache, tag cms-*)
Supabase ── site_sections ───────────────┤
         ── products, product_images ────┤   SectionsProvider / ProductsProvider (client)
         ── articles ────────────────────┘   useSection('home.hero') → nội dung + mặc định
  │
  └─ Lưu thành công → updateTag(cms-*) + revalidatePath('/', 'layout') → trang hiển thị nội dung mới ở request kế tiếp
```

- `src/lib/cms/sections/*.ts`: định nghĩa **mọi khối** (trường, nhãn tiếng Việt, nội dung gốc). Thêm khối mới = thêm 1 định nghĩa + dùng `useSection` trong component; Admin tự sinh form.
- `src/lib/cms/fields.ts`: chuẩn hoá (thiếu/sai kiểu → dùng nội dung gốc), kiểm tra bắt buộc, làm sạch HTML/URL trước khi lưu.
- `src/lib/cms/server.ts`: đọc Supabase có cache + fallback về dữ liệu trong code khi Supabase chưa cấu hình/lỗi.
- `src/components/admin/cms/*`: trình sửa khối (danh sách kéo lên/xuống, nhân bản, ảnh upload, rich text, lịch sử phiên bản, khôi phục nội dung gốc, cảnh báo chưa lưu).

## Các mục chỉnh sửa được

| Mục Admin | Nội dung |
| --- | --- |
| Trang chủ | Banner chạy (ảnh desktop/mobile, link, thời gian, bật/tắt, thứ tự) · Brand film (video, ảnh bìa) · Cổng Melanin Science · Tiêu đề khối Energy Shot · The Melanin Journal · Cảm nhận khách hàng (điểm, số đánh giá, từng review) · Let’s talk melanin |
| Melanin Science | Đầu trang · Melalogy là gì / câu chuyện / niềm tin · Sứ mệnh / tầm nhìn / 3 trụ cột · Targeted delivery / kết trang · SEO |
| Trang Shop | Đầu trang, chỉ số · 3 trụ cột, tiêu đề catalog, nhãn nút · Trang chi tiết sản phẩm (nhãn, biểu tượng cam kết, tiêu đề mục, vận chuyển) · Đánh giá khách hàng · SEO |
| Trang Blog & Tạp chí | Toàn bộ chữ/ảnh đầu trang và tiêu đề khối của `/blog`, `/magazine` · SEO |
| Trang thông tin | Liên hệ · FAQ (câu hỏi/trả lời) · Vận chuyển & đổi trả · Chính sách bảo mật · Điều khoản (từng mục, rich text) |
| Header, footer & chung | Logo, tagline, bản quyền · Menu, menu điện thoại, liên kết footer · Email, hotline, địa chỉ, giờ làm việc, mạng xã hội · Tài khoản chuyển khoản (checkout) · Khối đăng ký bản tin · SEO mặc định |
| Sản phẩm & danh mục | Tên, slug, giá, giá gốc, mô tả, thành phần, cách dùng, hoạt chất, nhãn công thức, màu nhấn, trạng thái, thứ tự, SEO · Nhiều ảnh, ảnh chính, thứ tự ảnh, mô tả ảnh · Danh mục |
| Bài Blog / Tạp chí | Tiêu đề, slug, chuyên mục, mô tả, nội dung rich text, ảnh, tác giả, ngày/hẹn giờ xuất bản, nổi bật, SEO |
| Tài khoản & phân quyền | (Super Admin) cấp/gỡ quyền theo email, tích mục cho Biên tập viên, khoá tài khoản, tạo tài khoản + mật khẩu tạm (cần service role key) |

## Ghi chú vận hành

- Mọi URL cũ giữ nguyên: `/product/1`…`/product/4`, `/blog/1`…`/blog/9`, `/magazine/1`…
- Giỏ hàng cũ trong trình duyệt khách tự cập nhật tên/giá/ảnh theo sản phẩm đang bán; đơn hàng luôn tính giá từ database.
- Bảng cũ `banners`, `homepage_sections`, `content_pages`, `site_settings` không còn được dùng nhưng được giữ lại (không xoá dữ liệu).
- Ảnh upload vào bucket `melalogy-media` (JPG/PNG/WebP/AVIF, tối đa 5 MB). Ảnh có sẵn trong `/public/assets` vẫn dùng được bằng cách dán đường dẫn `/assets/...`.
