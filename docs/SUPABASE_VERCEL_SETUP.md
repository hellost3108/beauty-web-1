# Kích hoạt Melalogy Admin (CMS v2) trên Supabase + Vercel

Không đưa mật khẩu, database password hoặc Secret/Service Role Key vào source code hay tin nhắn.

## Tóm tắt nhanh (project Supabase đã có sẵn)

1. Supabase Dashboard → **SQL Editor** → dán toàn bộ file `supabase/migrations/202609240001_cms_v2.sql` → **Run**.
2. Cấp quyền Super Admin cho tài khoản chính (mục 3 bên dưới) nếu chưa làm.
3. (Tuỳ chọn) Thêm `SUPABASE_SERVICE_ROLE_KEY` vào Vercel để tạo tài khoản admin ngay trong trang quản trị (mục 5).
4. Deploy nhánh chứa code mới lên Vercel.
5. Mở `https://melalogy.com/admin`, đăng nhập và kiểm tra theo checklist (mục 7).

File migration an toàn khi chạy nhiều lần: nó chỉ tạo bảng/cột/policy còn thiếu và chỉ nhập 4 sản phẩm Energy Shot + bài viết mẫu khi các bảng đó **đang trống**, nên không ghi đè dữ liệu Admin đã sửa.

## 1. Thứ tự migration cho project mới

Nếu tạo project Supabase mới hoàn toàn, chạy lần lượt trong SQL Editor:

1. `supabase/migrations/202608260001_mvp_admin.sql`
2. `supabase/migrations/202608260002_editorial_cms.sql`
3. `supabase/migrations/202609230001_customer_accounts.sql`
4. `supabase/migrations/202609240001_cms_v2.sql`

Không cần chạy `seed.sql` / `seed_editorial.sql` nữa — migration 4 tự nhập dữ liệu ban đầu khi bảng trống.

## 2. Migration CMS v2 tạo gì

| Thành phần | Mục đích |
| --- | --- |
| `site_sections` | Mỗi khối nội dung của website (header, footer, từng section trang chủ, Melanin Science, Shop, FAQ, chính sách…) là một bản ghi JSON. Website đọc bảng này; khối chưa sửa dùng nội dung gốc trong code. |
| `site_section_revisions` | Tự lưu 30 phiên bản gần nhất của mỗi khối để khôi phục trong Admin. |
| `profiles.permissions` + `can_edit(module)` | Phân quyền theo mục cho Biên tập viên. RLS trong database chặn mọi thao tác ghi ngoài quyền. |
| Cột `actives`, `formula_note`, `accent_color` trên `products` | Nhãn hoạt chất, nhãn công thức, màu nhấn hiển thị trên thẻ sản phẩm. |
| `protect_profile_privileges()` | Người dùng không tự nâng quyền được; SQL Editor vẫn cấp quyền được (bản cũ vô tình chặn cả SQL Editor). |

## 3. Tạo Super Admin đầu tiên

1. Supabase Dashboard → Authentication → Users → tạo user bằng email Admin (ví dụ `melalogyvietnam@gmail.com`) và mật khẩu mạnh; xác nhận email nếu Dashboard hỏi.
   Hoặc tự đăng ký tại `https://melalogy.com/signup`.
2. SQL Editor, thay email rồi chạy:

```sql
update public.profiles
set role = 'super_admin', is_active = true
where lower(email) = lower('EMAIL_ADMIN_CUA_BAN');

select id, email, role, is_active, permissions
from public.profiles
where lower(email) = lower('EMAIL_ADMIN_CUA_BAN');
```

Phải thấy đúng một dòng với `role = super_admin`. Từ đây mọi tài khoản khác được cấp quyền ngay trong Admin → **Tài khoản & phân quyền**.

## 4. Biến môi trường

`.env.local` (máy local) và Vercel → Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
# Tuỳ chọn — chỉ cần để tạo tài khoản admin / đặt lại mật khẩu trong Admin
SUPABASE_SERVICE_ROLE_KEY=...
```

Biến mới chỉ có hiệu lực ở deployment mới — nhớ Redeploy sau khi thêm.

## 5. `SUPABASE_SERVICE_ROLE_KEY` (tuỳ chọn)

- Lấy ở Supabase → Project Settings → API Keys → **secret / service_role**.
- Chỉ thêm trên Vercel (Production, và Preview nếu cần). **Không** đặt tiền tố `NEXT_PUBLIC_`, không commit vào Git.
- Code chỉ dùng khoá này trong server action của Super Admin để: tạo tài khoản với mật khẩu tạm, đặt lại mật khẩu tạm.
- Không có khoá này, Admin vẫn hoạt động đầy đủ; người mới tự đăng ký ở `/signup` rồi Super Admin cấp quyền bằng email.

## 6. Phân quyền

| Vai trò | Quyền |
| --- | --- |
| Super Admin | Toàn quyền + tạo/khoá tài khoản, phân quyền |
| Quản trị viên (admin) | Sửa mọi nội dung, sản phẩm, bài viết |
| Biên tập viên (editor) | Chỉ sửa các mục được tích: Header/footer & chung · Trang chủ · Melanin Science · Trang Shop · Trang thông tin · Trang Blog & Tạp chí · Sản phẩm & danh mục · Bài Blog · Bài Tạp chí |
| Khách hàng | Không vào được Admin |

Quyền được kiểm tra ở 2 lớp: server action của Next.js và Row Level Security trong Postgres.

## 7. Checklist sau khi deploy

- `/admin` chuyển tới trang đăng nhập khi chưa đăng nhập; tài khoản khách hàng bị từ chối.
- Admin → Trang chủ → sửa tiêu đề “Brand film” → **Lưu & cập nhật** → mở `melalogy.com` (tải lại) thấy tiêu đề mới.
- Admin → Trang chủ → Banner: đổi ảnh, tắt một banner, đổi thứ tự → trang chủ cập nhật.
- Admin → Sản phẩm: đổi giá một sản phẩm → trang Shop, trang chi tiết, giỏ hàng hiển thị giá mới; đơn hàng tính theo giá mới.
- Admin → Blog: tạo bài nháp (không hiện trên web) → chuyển “Đang hiển thị” → bài xuất hiện ở `/blog`.
- Lịch sử: mở biểu tượng đồng hồ ở một khối → “Dùng bản này” → Lưu → nội dung cũ được khôi phục.
- Tạo tài khoản Biên tập viên chỉ có quyền “Bài viết Blog” → đăng nhập bằng tài khoản đó chỉ thấy mục Blog.

## 8. Rollback an toàn

- Website có nội dung gốc trong code: nếu Supabase lỗi hoặc bảng chưa có, trang vẫn hiển thị đầy đủ.
- Muốn một khối quay về nội dung gốc: mở khối trong Admin → **Nội dung gốc** → Lưu.
- Không xoá bảng/bucket trên Supabase để tránh mất dữ liệu. Có thể quay lại deployment Vercel trước đó bất kỳ lúc nào.
