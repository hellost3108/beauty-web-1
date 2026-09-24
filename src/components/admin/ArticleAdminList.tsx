import Link from "next/link";
import { Edit3, ExternalLink, ImageOff, Plus, Star } from "lucide-react";
import { deleteArticle, setArticleStatus } from "@/app/admin/_actions/articles";
import DeleteButton from "@/components/admin/DeleteButton";
import StatusSelect from "@/components/admin/StatusSelect";
import { Notice, PageHeader, buttonClass, formatDateTime } from "@/components/admin/ui";

export type ArticleListRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  published_at: string | null;
};

export default function ArticleAdminList({
  channel,
  articles,
  error,
}: {
  channel: "blog" | "magazine";
  articles: ArticleListRow[];
  error?: string;
}) {
  const title = channel === "blog" ? "Blog" : "Tạp chí";

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Bài viết"
        title={title}
        description="Tạo bài mới, sửa nội dung, ảnh, SEO và trạng thái. Bài “Đang hiển thị” xuất hiện ngay trên website; bài nổi bật được xếp đầu."
        actions={
          <Link href={`/admin/${channel}/new`} className={buttonClass.primary}>
            <Plus className="h-4 w-4" /> Viết bài {title}
          </Link>
        }
      />
      {error && <Notice tone="error">{error}</Notice>}

      <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <ul className="divide-y divide-black/5">
          {articles.map((article) => (
            <li key={article.id} className="flex flex-wrap items-center gap-4 p-4 transition hover:bg-[#faf8f5] sm:flex-nowrap">
              <Link href={`/admin/${channel}/${article.id}/edit`} className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#eee9e4]">
                {article.image_url ? <img src={article.image_url} alt="" className="h-full w-full object-cover" /> : <ImageOff className="h-5 w-5 text-black/30" />}
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#f52334]">{article.category}</span>
                  {article.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
                      <Star className="h-3 w-3 fill-current" /> Nổi bật
                    </span>
                  )}
                </div>
                <Link href={`/admin/${channel}/${article.id}/edit`} className="mt-1 block truncate font-display text-xl hover:text-[#f52334]">
                  {article.title}
                </Link>
                <p className="mt-0.5 truncate text-xs text-black/45">
                  {article.author} · {formatDateTime(article.published_at)} · /{channel}/{article.slug}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusSelect value={article.status} onChange={setArticleStatus.bind(null, article.id, channel)} />
                {article.status === "published" && (
                  <a href={`/${channel}/${article.slug}`} target="_blank" rel="noreferrer" className={buttonClass.icon} aria-label="Xem trên website">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link href={`/admin/${channel}/${article.id}/edit`} className={buttonClass.icon} aria-label="Sửa bài viết">
                  <Edit3 className="h-4 w-4" />
                </Link>
                <DeleteButton label="bài viết" itemName={article.title} onDelete={deleteArticle.bind(null, article.id, channel)} />
              </div>
            </li>
          ))}
        </ul>
        {!error && !articles.length && <p className="p-12 text-center text-sm text-black/45">Chưa có bài viết. Hãy tạo bài đầu tiên.</p>}
      </section>
    </div>
  );
}
