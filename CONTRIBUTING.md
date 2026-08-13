# Quy trình làm việc nhóm

Dự án chia cho 4 người. Để tránh đè code lên nhau, tất cả làm theo quy trình dưới đây thay vì commit thẳng vào `main`.

## 1. Trước khi bắt đầu một việc mới

```bash
git checkout main
git pull origin main
git checkout -b <loại>/<tên-việc-ngắn-gọn>
```

Ví dụ tên branch:
- `feat/reskin-theme` — đổi logo, dịch nội dung Navbar/Footer/layout sang tiếng Việt
- `feat/reskin-shop` — đổi giao diện + dịch nội dung các trang mua hàng
- `feat/reskin-content` — đổi giao diện + dịch nội dung các trang phụ, tài khoản, pháp lý
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

Quyết định: **giữ nguyên bảng màu và font hiện tại**, không đổi. Việc re-skin chỉ gồm: đổi logo và dịch nội dung từ tiếng Anh sang tiếng Việt.

Vì dịch thuật cắt ngang gần như mọi file trong `src/views` và `src/components`, **không giao việc dịch cho 1 người làm riêng toàn site** — sẽ đụng hàng liên tục với người đang sửa layout ở đúng file đó. Thay vào đó, mỗi người tự dịch phần nội dung tiếng Anh nằm trong phạm vi mình phụ trách.

| Mảng | Người | File chính | Việc cụ thể |
|---|---|---|---|
| Logo & khung chung | Bạn | `src/assets/logo.png`, `Navbar.tsx`, `Footer.tsx`, `SplashLoader.tsx`, `IntroAnimation.tsx`, `layout.tsx` | Đổi logo, dịch text trong Navbar/Footer/metadata sang tiếng Việt |
| Trang chủ | Đã có người làm | `src/app/page.tsx` + các Section riêng trang chủ (`HeroSection`, `BestSellers`, `BeautyDiaries`, `TestimonialsSection`...) | Dịch nội dung trang chủ sang tiếng Việt trong lúc re-skin |
| Shop & mua hàng | Người còn lại #1 | `shop/`, `collection/`, `product/`, `cart/`, `checkout/`, `wishlist/`, `search/`, `ProductCard.tsx`, `ProductGrid.tsx` | Dịch nội dung các trang này sang tiếng Việt |
| Nội dung phụ, tài khoản, pháp lý | Người còn lại #2 | `about/`, `blog/`, `magazine/`, `faq/`, `contact/`, `login/`, `signup/`, `account/`, `terms/`, `privacy/`, `shipping-returns/` | Dịch nội dung các trang này sang tiếng Việt |

Việc logo/khung chung (Navbar, Footer) nên merge sớm vì xuất hiện ở mọi trang, nhưng **không chặn** 3 người còn lại bắt đầu — vì không đụng tới `globals.css`/`tailwind.config.ts` nữa.

**Database:** dự án hiện chưa có backend/database (Login, Signup, Checkout, Account chỉ là giao diện + state tạm). Phần này để sau, cả nhóm cùng bàn kiến trúc trước khi chia việc, không làm song song như re-skin.
