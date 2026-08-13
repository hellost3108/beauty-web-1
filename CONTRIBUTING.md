# Quy trình làm việc nhóm

Dự án chia cho 4 người. Để tránh đè code lên nhau, tất cả làm theo quy trình dưới đây thay vì commit thẳng vào `main`.

## 1. Trước khi bắt đầu một việc mới

```bash
git checkout main
git pull origin main
git checkout -b <loại>/<tên-việc-ngắn-gọn>
```

Ví dụ tên branch:
- `feat/reskin-theme` — đổi màu, font, token trong `globals.css` / `tailwind.config.ts`
- `feat/reskin-content` — đổi tên brand, copy văn bản
- `feat/reskin-assets` — logo, ảnh
- `fix/...` — sửa lỗi
- `chore/...` — việc hạ tầng, cấu hình, dọn dẹp

## 2. Trong lúc làm việc

- Commit nhỏ, thường xuyên, mô tả rõ đã đổi gì (không dùng tên chung chung như "update", "add files via upload").
- Không sửa file ngoài phạm vi việc đang làm. Nếu cần sửa file người khác đang động vào (vd `Navbar.tsx`, `Footer.tsx`, `globals.css`), báo trong nhóm trước.
- Push branch của mình thường xuyên để mọi người thấy tiến độ:

```bash
git push origin <tên-branch>
```

## 3. Khi xong việc

- Tạo Pull Request vào `main` trên GitHub, mô tả ngắn đã làm gì.
- Ít nhất 1 người khác trong nhóm xem qua trước khi merge (kể cả chỉ đọc diff 2 phút).
- Không merge PR của chính mình khi chưa ai xem, trừ việc rất nhỏ (sửa chính tả, đổi 1 ảnh...).

## 4. Không commit thẳng vào `main`

Mọi thay đổi đều qua branch + Pull Request. Việc này giúp:
- Tránh 2 người ghi đè code của nhau khi cùng sửa 1 file.
- Có lịch sử rõ ràng để biết ai đổi gì, khi nào, vì sao.
- Dễ revert nếu 1 thay đổi gây lỗi mà không ảnh hưởng phần còn lại.

## 5. Phân chia phần re-skin thương hiệu

Vì re-skin đụng nhiều file dùng chung, nên chia theo mảng thay vì theo trang, để tránh 2 người cùng sửa `globals.css`:

| Mảng | File chính |
|---|---|
| Theme (màu, font) | `src/app/globals.css`, `tailwind.config.ts` |
| Nội dung/copy | `src/views/*`, `src/data/*`, `src/components/*Section.tsx` |
| Logo/ảnh | `src/assets/*`, `public/assets/*` |
| Metadata/SEO | `src/app/layout.tsx` |

Người phụ trách theme nên làm **trước**, merge trước, để những người còn lại dùng đúng token màu/font mới thay vì mỗi người tự đặt màu riêng.
