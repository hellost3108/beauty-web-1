import Link from "next/link";
import { Archive, Edit3, ImageOff, Plus, Search } from "lucide-react";
import { archiveProduct } from "@/app/admin/_actions/content";
import { createClient } from "@/lib/supabase/server";

const statusLabel: Record<string, string> = {
  draft: "Bản nháp",
  published: "Đang hiển thị",
  archived: "Lưu trữ",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("id, name, slug, sku, price, status, featured, updated_at, categories(name), product_images(image_url, is_primary, sort_order)")
    .order("updated_at", { ascending: false });

  if (params.q?.trim()) query = query.ilike("name", `%${params.q.trim()}%`);
  if (["draft", "published", "archived"].includes(params.status ?? "")) {
    query = query.eq("status", params.status);
  }

  const { data: products, error } = await query;
  if (error) throw error;

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Catalogue</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Sản phẩm</h1>
          <p className="mt-2 text-sm text-black/50">Quản lý nội dung, giá, trạng thái và hình ảnh sản phẩm.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-5 py-3 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> Thêm sản phẩm
        </Link>
      </header>

      <form className="grid gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm sm:grid-cols-[1fr_190px_auto]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
          <input name="q" defaultValue={params.q ?? ""} className="w-full rounded-xl border border-black/10 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#f52334]" placeholder="Tìm theo tên sản phẩm..." />
        </label>
        <select name="status" defaultValue={params.status ?? ""} className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#f52334]">
          <option value="">Mọi trạng thái</option>
          <option value="published">Đang hiển thị</option>
          <option value="draft">Bản nháp</option>
          <option value="archived">Lưu trữ</option>
        </select>
        <button className="rounded-xl bg-[#191716] px-5 py-3 text-sm font-semibold text-white">Lọc</button>
      </form>

      <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-black/10 bg-[#faf8f5] text-xs uppercase tracking-wider text-black/45">
              <tr>
                <th className="px-5 py-4">Sản phẩm</th>
                <th className="px-5 py-4">SKU</th>
                <th className="px-5 py-4">Danh mục</th>
                <th className="px-5 py-4">Giá</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products?.map((product: any) => {
                const images = [...(product.product_images ?? [])].sort(
                  (a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order,
                );
                const category = Array.isArray(product.categories) ? product.categories[0] : product.categories;
                return (
                  <tr key={product.id} className="transition hover:bg-[#faf8f5]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#eee9e4]">
                          {images[0]?.image_url ? <img src={images[0].image_url} alt="" className="h-full w-full object-cover" /> : <ImageOff className="h-5 w-5 text-black/30" />}
                        </div>
                        <div>
                          <strong className="block max-w-xs">{product.name}</strong>
                          <span className="mt-1 block text-xs text-black/40">/{product.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-black/55">{product.sku || "—"}</td>
                    <td className="px-5 py-4 text-black/55">{category?.name || "—"}</td>
                    <td className="px-5 py-4 font-semibold">{Number(product.price).toLocaleString("vi-VN")}đ</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        product.status === "published" ? "bg-emerald-100 text-emerald-800" : product.status === "archived" ? "bg-black/10 text-black/50" : "bg-amber-100 text-amber-800"
                      }`}>{statusLabel[product.status]}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product.id}/edit`} className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:border-[#f52334] hover:text-[#f52334]" aria-label="Sửa sản phẩm">
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        {product.status !== "archived" && (
                          <form action={archiveProduct}>
                            <input type="hidden" name="id" value={product.id} />
                            <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-black/45 hover:border-red-300 hover:text-red-600" aria-label="Lưu trữ sản phẩm">
                              <Archive className="h-4 w-4" />
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!products?.length && <p className="p-12 text-center text-sm text-black/45">Không tìm thấy sản phẩm phù hợp.</p>}
      </section>
    </div>
  );
}
