import Link from "next/link";
import { Archive, Edit3, ImageOff, Plus } from "lucide-react";
import { archiveArticle } from "@/app/admin/_actions/content";

const statusLabel: Record<string, string> = {
  draft: "Bản nháp",
  published: "Đang hiển thị",
  archived: "Lưu trữ",
};

export default function ArticleAdminList({
  channel,
  articles,
}: {
  channel: "blog" | "magazine";
  articles: any[];
}) {
  const title = channel === "blog" ? "Blog" : "Tạp chí";

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Editorial CMS</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-2 text-sm text-black/50">Tạo bài mới, chỉnh sửa nội dung, ảnh, SEO và trạng thái xuất bản.</p>
        </div>
        <Link href={`/admin/${channel}/new`} className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-5 py-3 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> Thêm bài {title}
        </Link>
      </header>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="grid h-56 place-items-center overflow-hidden bg-[#eee9e4]">
              {article.image_url ? <img src={article.image_url} alt="" className="h-full w-full object-cover" /> : <ImageOff className="h-7 w-7 text-black/30" />}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">{article.category}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${article.status === "published" ? "bg-emerald-100 text-emerald-800" : article.status === "archived" ? "bg-black/10 text-black/45" : "bg-amber-100 text-amber-800"}`}>
                  {statusLabel[article.status]}
                </span>
              </div>
              <h2 className="mt-4 line-clamp-2 font-display text-2xl">{article.title}</h2>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">{article.excerpt}</p>
              <p className="mt-3 text-xs text-black/40">{article.author} · {article.date_label || "Chưa đặt ngày"}</p>
              <div className="mt-5 flex gap-2">
                <Link href={`/admin/${channel}/${article.id}/edit`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#191716] px-4 py-2.5 text-xs font-semibold text-white">
                  <Edit3 className="h-3.5 w-3.5" /> Chỉnh sửa
                </Link>
                {article.status !== "archived" && (
                  <form action={archiveArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <input type="hidden" name="channel" value={channel} />
                    <button className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-red-600" aria-label="Lưu trữ bài viết"><Archive className="h-4 w-4" /></button>
                  </form>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
      {!articles.length && <p className="rounded-3xl border border-dashed border-black/15 p-12 text-center text-sm text-black/45">Chưa có bài viết. Hãy tạo bài đầu tiên.</p>}
    </div>
  );
}
