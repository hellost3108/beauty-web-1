"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Quote,
  UserRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const BlogDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const post = blogPosts.find((item) => item.id === Number(id));

  useEffect(() => {
    if (!post) router.push("/blog");
    window.scrollTo(0, 0);
  }, [post, router]);

  if (!post) return null;

  const relatedPosts = blogPosts
    .filter((item) => item.id !== post.id)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  return (
    <div className="blog-detail-2026 min-h-screen text-[#211d1d]">
      <Navbar />

      <main>
        <header className="px-5 pb-10 pt-[9rem] md:px-8 md:pb-14 md:pt-[11rem]">
          <div className="mx-auto w-full max-w-[84rem]">
            <Link
              href="/blog"
              className="group mb-10 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-black/55 transition-colors hover:text-[#d91f35]"
              data-reveal="left"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Trở về Journal
            </Link>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div data-reveal="clip">
                <div className="mb-6 flex flex-wrap items-center gap-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.16em]">
                  <span className="rounded-full bg-[#ee2940] px-4 py-2 text-white">{post.category}</span>
                  <span className="text-black/45">Melalogy Journal · 2026</span>
                </div>
                <h1 className="max-w-5xl font-display text-[clamp(2.65rem,7.3vw,7.6rem)] leading-[0.9] tracking-[-0.055em]">
                  {post.title}
                </h1>
              </div>
              <div className="border-l border-black/12 pl-5" data-reveal="right" data-reveal-delay="100">
                <p className="font-body text-sm leading-7 text-black/55">{post.excerpt}</p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-black/10 pt-5 font-body text-xs uppercase tracking-[0.12em] text-black/48" data-reveal="up">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#ee2940]" />{post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-[#ee2940]" />{post.readingTime}</span>
              <span className="inline-flex items-center gap-2"><UserRound className="h-3.5 w-3.5 text-[#ee2940]" />{post.author}</span>
            </div>
          </div>
        </header>

        <section className="px-3 md:px-8" data-reveal="scale">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[92rem] overflow-hidden rounded-[1.6rem] sm:aspect-[16/10] md:rounded-[3rem] lg:aspect-[16/8.2]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/35 bg-black/20 px-4 py-2 font-body text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md md:bottom-8 md:left-8">
              Ảnh · Melalogy Studio
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid w-full max-w-[76rem] gap-12 lg:grid-cols-[14rem_minmax(0,46rem)] lg:justify-between lg:gap-20">
            <aside className="h-fit lg:sticky lg:top-32" data-reveal="left">
              <span className="mb-5 block font-body text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#d91f35]">Thông tin bài viết</span>
              <dl className="space-y-5 border-y border-black/10 py-6 font-body text-sm">
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-black/40">Tác giả</dt>
                  <dd className="mt-1 font-semibold">{post.author}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-black/40">Chuyên mục</dt>
                  <dd className="mt-1 font-semibold">{post.category}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-black/40">Thời gian đọc</dt>
                  <dd className="mt-1 font-semibold">{post.readingTime}</dd>
                </div>
              </dl>
              <Link href="/shop" className="group mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-[#d91f35]">
                Khám phá sản phẩm
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </aside>

            <article data-reveal="up">
              <div className="blog-article-lead-2026 mb-12 rounded-[1.5rem] border border-black/10 bg-white p-7 md:p-9">
                <Quote className="mb-5 h-7 w-7 text-[#ee2940]" />
                <p className="font-display text-2xl leading-[1.2] md:text-3xl">{post.excerpt}</p>
              </div>
              <div
                className="blog-prose-2026"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="mt-14 flex flex-col justify-between gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
                <div>
                  <span className="block font-body text-[0.65rem] uppercase tracking-[0.16em] text-black/40">Đã đọc đến cuối</span>
                  <strong className="mt-1 block font-display text-2xl">Cảm ơn bạn đã đọc.</strong>
                </div>
                <Link href="/blog" className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-[#d91f35]">
                  Xem tất cả bài viết
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="blog-related-2026 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-black/10 pb-7">
              <div data-reveal="up">
                <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-[#ee2940]">Bài đọc tiếp theo</p>
                <h2 className="font-display text-4xl md:text-6xl">Có thể bạn sẽ thích</h2>
              </div>
              <Link href="/blog" className="hidden items-center gap-2 font-body text-sm font-semibold md:inline-flex">
                Xem Journal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3" data-motion-stagger>
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="blog-related-card-2026 group overflow-hidden rounded-[1.5rem] border border-black/10 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-body text-[0.62rem] font-bold uppercase tracking-[0.14em] backdrop-blur-md">{relatedPost.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="font-body text-[0.66rem] uppercase tracking-[0.12em] text-black/42">{relatedPost.readingTime}</p>
                    <h3 className="mt-3 font-display text-2xl leading-[1.08] transition-colors group-hover:text-[#d91f35]">{relatedPost.title}</h3>
                    <span className="mt-6 inline-flex items-center gap-2 font-body text-xs font-semibold text-[#d91f35]">Đọc tiếp <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
