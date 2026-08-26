insert into public.categories (id, name, slug, description, image_url, sort_order)
values
  (1, 'Cấp Ẩm', 'cap-am', 'Dành cho làn da thiếu nước và khô căng.', '/assets/mask-hydrating-blue.png', 10),
  (2, 'Phục Hồi', 'phuc-hoi', 'Hỗ trợ làm dịu và củng cố hàng rào bảo vệ da.', '/assets/mask-recovery-green.png', 20),
  (3, 'Làm Sáng', 'lam-sang', 'Hỗ trợ làn da đều màu và rạng rỡ hơn.', '/assets/mask-brightening-yellow.png', 30),
  (4, 'Rạng Rỡ', 'rang-ro', 'Dành cho làn da thiếu sức sống và độ đàn hồi.', '/assets/mask-radiance-purple.png', 40)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order;

select setval(
  pg_get_serial_sequence('public.categories', 'id'),
  greatest((select coalesce(max(id), 1) from public.categories), 1),
  true
);

insert into public.products (
  id,
  category_id,
  name,
  slug,
  sku,
  subtitle,
  short_description,
  description,
  ingredients,
  usage,
  price,
  status,
  featured,
  sort_order
)
values
  (1, 1, 'Mặt Nạ Hydrogel Energy Shot - Cấp Ẩm', 'mat-na-hydrogel-energy-shot-cap-am', 'ML-ES-HYDRATE', 'Cấp Ẩm Chuyên Sâu', 'Hyaluronic Acid và Ceramide NP cho làn da thiếu nước.', 'Mặt nạ hydrogel cấp ẩm tức thì với Hyaluronic Acid và Ceramide NP, giúp phục hồi hàng rào bảo vệ da và duy trì độ ẩm sâu suốt nhiều giờ.', 'Hyaluronic Acid, Ceramide NP, Nước Khoáng', 'Đắp mặt nạ lên da đã làm sạch trong 15-20 phút. Gỡ mặt nạ và massage nhẹ phần tinh chất còn lại cho thấm đều. Sử dụng 2-3 lần/tuần để đạt hiệu quả tốt nhất.', 79000, 'published', true, 10),
  (2, 2, 'Mặt Nạ Hydrogel Energy Shot - Phục Hồi', 'mat-na-hydrogel-energy-shot-phuc-hoi', 'ML-ES-RECOVER', 'Phục Hồi & Làm Dịu Da', 'Madecassic Acid và rau má cho làn da nhạy cảm.', 'Mặt nạ hydrogel phục hồi với Madecassic Acid và chiết xuất rau má, làm dịu da nhạy cảm, kích ứng và hỗ trợ tái tạo da.', 'Madecassic Acid, Centella Asiatica Leaf Vesicles', 'Đắp mặt nạ lên da đã làm sạch trong 15-20 phút. Gỡ mặt nạ và massage nhẹ phần tinh chất còn lại cho thấm đều. Phù hợp dùng khi da đang kích ứng hoặc sau các bước điều trị mạnh.', 79000, 'published', true, 20),
  (3, 3, 'Mặt Nạ Hydrogel Energy Shot - Làm Sáng', 'mat-na-hydrogel-energy-shot-lam-sang', 'ML-ES-BRIGHTEN', 'Làm Sáng & Đều Màu Da', 'Niacinamide và cám gạo cho làn da xỉn màu.', 'Mặt nạ hydrogel làm sáng da với Niacinamide và chiết xuất cám gạo, giúp đều màu da và mang lại vẻ rạng rỡ tự nhiên.', 'Niacinamide, Oryza Sativa (Rice) Bran Extract', 'Đắp mặt nạ lên da đã làm sạch trong 15-20 phút. Gỡ mặt nạ và massage nhẹ phần tinh chất còn lại cho thấm đều. Dùng đều đặn để cải thiện tông màu da.', 79000, 'published', true, 30),
  (4, 4, 'Mặt Nạ Hydrogel Energy Shot - Rạng Rỡ', 'mat-na-hydrogel-energy-shot-rang-ro', 'ML-ES-RADIANCE', 'Săn Chắc & Trẻ Hoá Da', 'Sodium DNA và peptide cho làn da thiếu sức sống.', 'Mặt nạ hydrogel trẻ hoá với Sodium DNA và Acetyl Hexapeptide-8, hỗ trợ săn chắc da và cải thiện độ đàn hồi.', 'Sodium DNA, Acetyl Hexapeptide-8', 'Đắp mặt nạ lên da đã làm sạch trong 15-20 phút. Gỡ mặt nạ và massage nhẹ phần tinh chất còn lại cho thấm đều. Sử dụng 2-3 lần/tuần cho làn da săn chắc hơn.', 79000, 'published', true, 40)
on conflict (id) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  slug = excluded.slug,
  sku = excluded.sku,
  subtitle = excluded.subtitle,
  short_description = excluded.short_description,
  description = excluded.description,
  ingredients = excluded.ingredients,
  usage = excluded.usage,
  price = excluded.price,
  status = excluded.status,
  featured = excluded.featured,
  sort_order = excluded.sort_order;

select setval(
  pg_get_serial_sequence('public.products', 'id'),
  greatest((select coalesce(max(id), 1) from public.products), 1),
  true
);

insert into public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
values
  ('00000000-0000-4000-8000-000000000101', 1, '/assets/mask-hydrating-blue.png', 'Mặt nạ Energy Shot Cấp Ẩm', 0, true),
  ('00000000-0000-4000-8000-000000000102', 1, '/assets/skincare-face-lifestyle.jpg', 'Làn da được cấp ẩm', 10, false),
  ('00000000-0000-4000-8000-000000000201', 2, '/assets/mask-recovery-green.png', 'Mặt nạ Energy Shot Phục Hồi', 0, true),
  ('00000000-0000-4000-8000-000000000202', 2, '/assets/mask-recovery-green-hero.png', 'Mặt nạ phục hồi trên nền xanh', 10, false),
  ('00000000-0000-4000-8000-000000000301', 3, '/assets/mask-brightening-yellow.png', 'Mặt nạ Energy Shot Làm Sáng', 0, true),
  ('00000000-0000-4000-8000-000000000302', 3, '/assets/skincare-face-lifestyle.jpg', 'Làn da rạng rỡ', 10, false),
  ('00000000-0000-4000-8000-000000000401', 4, '/assets/mask-radiance-purple.png', 'Mặt nạ Energy Shot Rạng Rỡ', 0, true),
  ('00000000-0000-4000-8000-000000000402', 4, '/assets/skincare-face-lifestyle.jpg', 'Làn da săn chắc rạng rỡ', 10, false)
on conflict (id) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text,
  sort_order = excluded.sort_order,
  is_primary = excluded.is_primary;

insert into public.banners (
  id,
  name,
  placement,
  eyebrow,
  title,
  highlighted_text,
  subtitle,
  desktop_image_url,
  button_label,
  button_url,
  secondary_button_label,
  secondary_button_url,
  sort_order,
  status
)
values
  (1, 'Tín hiệu làn da', 'home_hero', 'Every skin state has a signal', 'Lắng Nghe', 'Tín Hiệu Làn Da', 'Khi làn da lên tiếng bằng khô căng, nhạy cảm hay xỉn màu, Energy Shot giúp bạn chọn đúng công thức thay vì thêm nhiều bước.', '/assets/skincare-mask-application.jpg', 'Khám phá bộ sưu tập', '/collection', 'Triết lý Energy Shot', '/about', 10, 'published'),
  (2, 'Energy Shot cấp ẩm', 'home_hero', 'Hydrating Energy Shot', 'Cấp Ẩm', 'Chuyên Sâu', 'Hyaluronic Acid và Ceramide NP đưa độ ẩm trở lại, giúp bề mặt da căng mượt và khỏe khoắn hơn.', '/assets/mask-hydrating-blue.png', 'Khám phá bộ sưu tập', '/collection', 'Triết lý Energy Shot', '/about', 20, 'published'),
  (3, 'Energy Shot phục hồi', 'home_hero', 'Recovery Energy Shot', 'Phục Hồi &', 'Làm Dịu', 'Madecassic Acid và rau má hỗ trợ làm dịu cảm giác khó chịu, phù hợp với làn da nhạy cảm.', '/assets/mask-recovery-green-hero.png', 'Khám phá bộ sưu tập', '/collection', 'Triết lý Energy Shot', '/about', 30, 'published'),
  (4, 'Energy Shot làm sáng', 'home_hero', 'Brightening Energy Shot', 'Rạng Rỡ', 'Tự Nhiên', 'Niacinamide và cám gạo giúp bề mặt da trông đều màu, trong trẻo và tràn đầy sức sống.', '/assets/mask-brightening-yellow.png', 'Khám phá bộ sưu tập', '/collection', 'Triết lý Energy Shot', '/about', 40, 'published')
on conflict (id) do update set
  name = excluded.name,
  placement = excluded.placement,
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  highlighted_text = excluded.highlighted_text,
  subtitle = excluded.subtitle,
  desktop_image_url = excluded.desktop_image_url,
  button_label = excluded.button_label,
  button_url = excluded.button_url,
  secondary_button_label = excluded.secondary_button_label,
  secondary_button_url = excluded.secondary_button_url,
  sort_order = excluded.sort_order,
  status = excluded.status;

select setval(
  pg_get_serial_sequence('public.banners', 'id'),
  greatest((select coalesce(max(id), 1) from public.banners), 1),
  true
);

insert into public.homepage_sections (
  section_key,
  eyebrow,
  title,
  highlighted_text,
  subtitle,
  body,
  status,
  sort_order
)
values (
  'why_melalogy',
  'Melalogy standard',
  'Vì Sao Chọn',
  'Melalogy',
  'Mỗi trạng thái da có một tín hiệu riêng.',
  'Melalogy giúp bạn nhận ra và chọn đúng công thức cần thiết.',
  'published',
  10
)
on conflict (section_key) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  highlighted_text = excluded.highlighted_text,
  subtitle = excluded.subtitle,
  body = excluded.body,
  status = excluded.status,
  sort_order = excluded.sort_order;

insert into public.site_settings (key, value, is_public)
values
  ('contact_email', to_jsonb('melalogyvietnam@gmail.com'::text), true),
  ('site_url', to_jsonb('https://melalogy.com'::text), true)
on conflict (key) do update set
  value = excluded.value,
  is_public = excluded.is_public;
