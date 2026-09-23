"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit3, LoaderCircle, Plus, Save, X } from "lucide-react";
import { saveCategory } from "@/app/admin/_actions/catalog";
import ImageInput from "@/components/admin/fields/ImageInput";
import { Card, buttonClass, helpClass, inputClass, labelClass, slugify } from "@/components/admin/ui";

export type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  productCount: number;
};

type Draft = {
  id: number | null;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: string;
};

const emptyDraft = (): Draft => ({ id: null, name: "", slug: "", description: "", imageUrl: "", isActive: true, sortOrder: "0" });

export default function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const edit = (category: CategoryRow) =>
    setDraft({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
      imageUrl: category.image_url ?? "",
      isActive: category.is_active,
      sortOrder: String(category.sort_order),
    });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft) return;
    setSaving(true);
    const result = await saveCategory(draft);
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message ?? "Đã lưu danh mục.");
    setDraft(null);
    router.refresh();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
      <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-black/10 bg-[#faf8f5] text-xs uppercase tracking-wider text-black/45">
              <tr>
                <th className="px-5 py-4">Danh mục</th>
                <th className="px-5 py-4">Sản phẩm</th>
                <th className="px-5 py-4">Thứ tự</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4 text-right">Sửa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {categories.map((category) => (
                <tr key={category.id} className={draft?.id === category.id ? "bg-red-50/40" : "hover:bg-[#faf8f5]"}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {category.image_url ? (
                        <img src={category.image_url} alt="" className="h-11 w-11 rounded-xl object-cover" />
                      ) : (
                        <span className="h-11 w-11 rounded-xl bg-[#eee9e4]" />
                      )}
                      <div>
                        <strong className="block">{category.name}</strong>
                        <span className="text-xs text-black/40">{category.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-black/55">{category.productCount}</td>
                  <td className="px-5 py-4 text-black/55">{category.sort_order}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category.is_active ? "bg-emerald-100 text-emerald-800" : "bg-black/10 text-black/50"}`}>
                      {category.is_active ? "Hiển thị" : "Đang ẩn"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button type="button" className={`${buttonClass.icon} ml-auto`} onClick={() => edit(category)} aria-label={`Sửa ${category.name}`}>
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {categories.length === 0 && <p className="p-10 text-center text-sm text-black/45">Chưa có danh mục.</p>}
      </section>

      <div>
        {draft ? (
          <Card className="xl:sticky xl:top-24">
            <form onSubmit={submit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl">{draft.id ? "Sửa danh mục" : "Danh mục mới"}</h2>
                <button type="button" className={buttonClass.icon} onClick={() => setDraft(null)} aria-label="Đóng">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <label className={labelClass}>
                Tên danh mục
                <input
                  className={inputClass}
                  required
                  value={draft.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    setDraft({ ...draft, name, slug: draft.id ? draft.slug : slugify(name) });
                  }}
                />
                <span className={helpClass}>Tên này hiển thị trên nhãn sản phẩm và bộ lọc trang Shop.</span>
              </label>
              <label className={labelClass}>
                Slug
                <input className={inputClass} required value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: slugify(event.target.value) })} />
              </label>
              <label className={labelClass}>
                Mô tả
                <textarea className={inputClass} rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
              </label>
              <div className={labelClass}>
                Ảnh
                <ImageInput value={draft.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} folder="categories" compact />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className={labelClass}>
                  Thứ tự
                  <input className={inputClass} type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: event.target.value })} />
                </label>
                <label className="mt-7 flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={draft.isActive} onChange={(event) => setDraft({ ...draft, isActive: event.target.checked })} className="h-4 w-4 accent-[#f52334]" />
                  Hiển thị
                </label>
              </div>
              <button className={`${buttonClass.primary} w-full`} disabled={saving}>
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Lưu danh mục
              </button>
            </form>
          </Card>
        ) : (
          <Card className="text-center">
            <p className="text-sm leading-6 text-black/55">Chọn biểu tượng bút để sửa một danh mục, hoặc tạo danh mục mới.</p>
            <button type="button" className={`${buttonClass.primary} mt-4`} onClick={() => setDraft(emptyDraft())}>
              <Plus className="h-4 w-4" /> Thêm danh mục
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}
