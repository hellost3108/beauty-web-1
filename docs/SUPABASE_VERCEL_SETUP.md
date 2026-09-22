# Kích hoạt Melalogy Admin trên Supabase + Vercel

Không đưa password, database password hoặc Secret/Service Role Key vào source hay tin nhắn. Admin MVP chỉ cần Project URL và Publishable Key.

## 1. Tạo Supabase project

1. Đăng nhập Supabase và tạo project mới cho Melalogy.
2. Chọn region gần nhóm người dùng chính nhất trong danh sách Supabase đang cung cấp.
3. Lưu database password trong password manager; website này không cần dùng password đó.
4. Chờ project chuyển sang trạng thái sẵn sàng.

Khuyến nghị ban đầu: tạo một project cho production. Khi quy trình vận hành ổn định, tạo thêm project staging riêng.

## 2. Tạo schema, RLS và Storage

Trong Supabase Dashboard → SQL Editor:

1. Mở và chạy toàn bộ `supabase/migrations/202608260001_mvp_admin.sql`.
2. Kiểm tra không có lỗi.
3. Mở và chạy toàn bộ `supabase/seed.sql` để nhập 4 sản phẩm, danh mục, hero và nội dung trang chủ hiện tại.

Migration đồng thời tạo bucket public `melalogy-media` với giới hạn 5 MB/ảnh và các policy chỉ cho Admin ghi dữ liệu.

## 3. Tạo Admin đầu tiên

1. Trong Supabase Dashboard → Authentication → Users, tạo user bằng email Admin và một mật khẩu mạnh.
2. Xác nhận email user nếu Dashboard cung cấp lựa chọn này.
3. Trong SQL Editor, thay email bên dưới rồi chạy:

```sql
update public.profiles
set role = 'super_admin', is_active = true
where lower(email) = lower('EMAIL_ADMIN_CUA_BAN');
```

4. Kiểm tra chính xác một dòng đã được cập nhật:

```sql
select id, email, role, is_active
from public.profiles
where lower(email) = lower('EMAIL_ADMIN_CUA_BAN');
```

Nếu không có dòng nào, không chạy SQL cấp quyền khác. Hãy kiểm tra user đã được tạo trong Authentication trước.

## 4. Lấy thông tin kết nối an toàn

Trong Supabase Dashboard, mở Connect/API và sao chép:

- Project URL
- Publishable Key

Tạo `.env.local` ở root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Không thêm `SUPABASE_SERVICE_ROLE_KEY`. Admin MVP không sử dụng key này.

## 5. Kiểm tra local

1. Khởi động website local.
2. Mở `/admin/login` và đăng nhập bằng Admin vừa tạo.
3. Kiểm tra lần lượt:
   - tạo category nháp;
   - tạo product nháp và upload hai ảnh;
   - đặt một ảnh làm ảnh chính;
   - publish product và kiểm tra `/collection`;
   - sửa banner và nội dung homepage;
   - đăng xuất rồi thử truy cập lại `/admin`.
4. Mở website ở cửa sổ ẩn danh để xác nhận khách không thể ghi dữ liệu hoặc xem bản nháp.

## 6. Cấu hình Supabase Auth URL

Trong Authentication → URL Configuration:

- Site URL: `https://melalogy.com`
- Thêm URL preview Vercel cụ thể khi cần kiểm thử email reset/magic link trong tương lai.

Đăng nhập email/password hiện tại không cần callback OAuth, nhưng Site URL đúng vẫn cần cho các flow Auth sau này.

## 7. Thêm biến môi trường trên Vercel

Trong Vercel Project → Settings → Environment Variables, thêm cả hai biến:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Áp dụng tối thiểu cho Production. Nên áp dụng cho Preview và Development nếu cùng dùng project này trong giai đoạn đầu.

Biến môi trường mới chỉ có hiệu lực với deployment mới. Tạo một Preview Deployment trước, kiểm tra toàn bộ checklist rồi mới promote/deploy Production.

## 8. Checklist production

- `/admin` chuyển tới login khi chưa đăng nhập.
- User role `customer` không vào được Admin.
- Admin tạo/sửa/ẩn sản phẩm thành công.
- Khách chỉ thấy product/banner/section `published`.
- Ảnh upload hiển thị trên `melalogy.com`.
- Không có Secret/Service Role Key trong source, bundle frontend hoặc Vercel logs.
- Domain `melalogy.com` vẫn trỏ đúng deployment production.
- Có bản backup database trước các lần import hoặc migration lớn.

## 9. Rollback an toàn

Code storefront có fallback về dữ liệu tĩnh nếu hai biến Supabase chưa được cấu hình. Nếu activation gặp lỗi trước khi team bắt đầu nhập dữ liệu thật:

1. Gỡ hai biến Supabase khỏi deployment Preview hoặc quay lại deployment Vercel trước đó.
2. Không xoá project Supabase và không xoá bucket để tránh mất dữ liệu đã nhập.
3. Sửa lỗi trên Preview rồi deploy lại.
