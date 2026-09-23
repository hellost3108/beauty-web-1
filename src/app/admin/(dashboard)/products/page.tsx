import Link from "next/link";
import { Edit3, ExternalLink, ImageOff, Plus, Search } from "lucide-react";
import { setProductStatus } from "@/app/admin/_actions/catalog";
import StatusSelect from "@/components/admin/StatusSelect";
import { Notice, PageHeader, buttonClass } from "@/components/admin/ui";
import { friendlyError } from "@/lib/admin/server-utils";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  status: "draft" | "published" | "archived";
  sort_order: number;
  categories: { name: string } | { name: string }[] | null;
  product_images: Array<{ image_url: string; is_primary: boolean; sort_order: number }> | null;
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  await requireModule("products");
  const params = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("id, name, slug, sku, price, status, sort_order, categories(name), product_images(image_url, is_primary, sort_order)")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (params.q?.trim()) query = query.ilike("name", `%${params.q.trim()}%`);
  if (["draft", "published", "archived"].includes(params.status ?? "")) query = query.eq("status", params.status!);

  const { data, error } = await query;
  const products = (data ?? []) as ProductRow[];

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Cửa hàng"
        title="Sản phẩm"
        description="Tên, giá, mô tả, ảnh và trạng thái hiển thị. Chỉ sản phẩm “Đang hiển thị” xuất hiện trên website và được đặt hàng."
        actions={
          <Link href="/admin/products/new" className={buttonClass.primary}>
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </Link>
        }
      />

      {error && <Notice tone="error">{friendlyError(error)}</Notice>}

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
        <button className={buttonClass.dark}>Lọc</button>
      </form>

      <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-black/10 bg-[#faf8f5] text-xs uppercase tracking-wider text-black/45">
              <tr>
                <th className="px-5 py-4">Sản phẩm</th>
                <th className="px-5 py-4">Danh mục</th>
                <th className="px-5 py-4">Giá</th>
                <th className="px-5 py-4">Thứ tự</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.map((product) => {
                const images = [...(product.product_images ?? [])].sort(
                  (a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order,
                );
                const category = Array.isArray(product.categories) ? product.categories[0] : product.categories;
                return (
                  <tr key={product.id} className="transition hover:bg-[#faf8f5]">
                    <td className="px-5 py-4">
                      <Link href={`/admin/products/${product.id}/edit`} className="flex items-center gap-3">
                        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#eee9e4]">
                          {images[0]?.image_url ? <img src={images[0].image_url} alt="" className="h-full w-full object-cover" /> : <ImageOff className="h-5 w-5 text-black/30" />}
                        </div>
                        <div>
                          <strong className="block max-w-xs hover:text-[#f52334]">{product.name}</strong>
                          <span className="mt-1 block text-xs text-black/40">
                            {product.sku || "—"} · /product/{product.id}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-black/55">{category?.name || "—"}</td>
                    <td className="px-5 py-4 font-semibold">{Number(product.price).toLocaleString("vi-VN")}đ</td>
                    <td className="px-5 py-4 text-black/55">{product.sort_order}</td>
                    <td className="px-5 py-4">
                      <StatusSelect value={product.status} onChange={setProductStatus.bind(null, product.id)} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <a href={`/product/${product.id}`} target="_blank" rel="noreferrer" className={buttonClass.icon} aria-label="Xem trên website">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <Link href={`/admin/products/${product.id}/edit`} className={buttonClass.icon} aria-label="Sửa sản phẩm">
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!error && products.length === 0 && <p className="p-12 text-center text-sm text-black/45">Không tìm thấy sản phẩm phù hợp.</p>}
      </section>
    </div>
  );
}
