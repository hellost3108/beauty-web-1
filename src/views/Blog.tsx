"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FanClubSection from "@/components/FanClubSection";
import { blogPosts } from "@/data/melalogyBlogPosts";

const categories = ["Tất Cả", "Chăm Sóc Da", "Trang Điểm", "Thương Hiệu"] as const;

const cardLayouts = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-12",
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Tất Cả");
  const featuredPost = blogPosts[0];

  const visiblePosts = useMemo(
    () =>
      blogPosts
        .slice(1)
        .filter((post) => activeCategory === "Tất Cả" || post.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="blog-page-2026 min-h-screen text-[#211d1d]">
      <Navbar />

      <main>
        <section className="blog-hero-2026 relative overflow-hidden px-5 pb-16 pt-[8.75rem] md:px-8 md:pb-24 md:pt-[10.5rem]">
          <div className="blog-orbit-2026" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative z-10 max-w-3xl" data-reveal="left">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 font-body text-[0.72rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-[#ee2940]" />
                Melalogy Journal · Số 08/2026
              </div>
              <h1 className="font-display text-[clamp(3.6rem,8.6vw,8.8rem)] leading-[1.04] tracking-[-0.025em]">
                Đọc chậm.
                <span className="mt-2 block pl-[0.55em] text-[#ee2940]">Đẹp lâu.</span>
              </h1>
              <p className="mt-8 max-w-xl font-body text-base leading-8 text-black/60 md:text-lg">
                Kiến thức chăm sóc da được chắt lọc, những góc nhìn làm đẹp có chiều sâu
                và câu chuyện thương hiệu dành riêng cho người Việt.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black/10 pt-6 font-body text-sm text-black/65">
                <span><strong className="mr-2 text-xl text-black">09</strong>bài tuyển chọn</span>
                <span><strong className="mr-2 text-xl text-black">03</strong>chuyên mục</span>
                <a href="#bai-moi" className="group inline-flex items-center gap-2 font-semibold text-black">
                  Khám phá ngay
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="blog-hero-media-2026 relative">
              <div className="absolute -left-5 bottom-12 z-20 hidden -rotate-90 font-body text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-black/45 md:block">
                Beauty · Science · Culture
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/11] md:rounded-[2.75rem]">
                <Image
                  src="/assets/melalogy-blog-hero-2026.png"
                  alt="Phụ nữ Việt Nam chăm sóc da dưới ánh sáng buổi sáng"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-[1.25rem] border border-white/30 bg-white/16 p-4 text-white backdrop-blur-md md:bottom-7 md:left-7 md:right-7 md:p-5">
                  <div>
                    <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/75">Chủ đề tháng này</span>
                    <p className="mt-1 font-display text-2xl">Hiểu làn da của bạn</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bai-moi" className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="mb-10 flex flex-col justify-between gap-5 border-b border-black/10 pb-7 md:flex-row md:items-end">
              <div data-reveal="up">
                <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-[#ee2940]">Bài đọc nổi bật</p>
                <h2 className="font-display text-4xl md:text-6xl">Chọn bởi ban biên tập</h2>
              </div>
              <p className="max-w-md font-body text-sm leading-6 text-black/55 md:text-right">
                Góc nhìn mới nhất về thương hiệu, hoạt chất và những thói quen giúp làn da khỏe đẹp bền vững.
              </p>
            </div>

            <Link href={`/blog/${featuredPost.id}`} className="blog-feature-2026 group grid overflow-hidden rounded-[2rem] border border-black/10 bg-white md:grid-cols-[1.22fr_0.78fr] md:rounded-[2.75rem]" data-reveal="scale">
              <div className="relative min-h-[22rem] overflow-hidden md:min-h-[36rem]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 62vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 font-body text-[0.68rem] font-bold uppercase tracking-[0.16em] text-black shadow-sm md:left-7 md:top-7">
                  {featuredPost.category}
                </span>
              </div>
              <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                <div>
                  <div className="mb-7 flex flex-wrap gap-5 font-body text-xs uppercase tracking-[0.12em] text-black/45">
                    <span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#ee2940]" />{featuredPost.date}</span>
                    <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-[#ee2940]" />{featuredPost.readingTime}</span>
                  </div>
                  <h3 className="font-display text-[clamp(2.25rem,4vw,4.5rem)] leading-[1.12] tracking-[-0.015em] transition-colors duration-300 group-hover:text-[#d91f35]">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-6 font-body text-base leading-7 text-black/58 lg:text-lg lg:leading-8">{featuredPost.excerpt}</p>
                </div>
                <div className="mt-10 flex items-end justify-between border-t border-black/10 pt-6">
                  <div>
                    <span className="block font-body text-[0.66rem] uppercase tracking-[0.16em] text-black/40">Biên tập bởi</span>
                    <span className="mt-1 block font-body font-semibold">{featuredPost.author}</span>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ee2940] text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="blog-index-2026 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div data-reveal="up">
                <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-[#ee2940]">Thư viện kiến thức</p>
                <h2 className="font-display text-4xl md:text-6xl">Đọc theo nhịp của bạn</h2>
              </div>
              <div className="blog-filter-2026 flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Lọc bài viết theo chuyên mục">
                {categories.map((category) => {
                  const count = category === "Tất Cả" ? blogPosts.length : blogPosts.filter((post) => post.category === category).length;
                  const isActive = category === activeCategory;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={`shrink-0 rounded-full border px-4 py-2.5 font-body text-xs font-semibold transition-all duration-300 ${isActive ? "border-[#ee2940] bg-[#ee2940] text-white" : "border-black/10 bg-white/65 text-black/65 hover:border-black/30 hover:text-black"}`}
                    >
                      {category} <span className="ml-1 opacity-65">{String(count).padStart(2, "0")}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {visiblePosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12" data-motion-stagger>
                {visiblePosts.map((post, index) => (
                  <article key={post.id} className={`${cardLayouts[index % cardLayouts.length]} blog-card-2026 group overflow-hidden rounded-[1.7rem] border border-black/10 bg-white`}>
                    <Link href={`/blog/${post.id}`} className="flex h-full flex-col">
                      <div className={`relative overflow-hidden ${index < 2 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          className="object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:saturate-[1.08]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
                        <span className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/85 px-3.5 py-2 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black backdrop-blur-md">
                          {post.category}
                        </span>
                        <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 font-body text-[0.68rem] uppercase tracking-[0.11em] text-black/43">
                          <span>{post.date}</span>
                          <span>{post.readingTime}</span>
                        </div>
                        <h3 className="font-display text-[clamp(1.7rem,2.6vw,2.65rem)] leading-[1.04] transition-colors duration-300 group-hover:text-[#d91f35]">{post.title}</h3>
                        <p className="mt-4 line-clamp-3 font-body text-sm leading-6 text-black/55 md:text-base md:leading-7">{post.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-6 font-body text-xs font-semibold">
                          <span>{post.author}</span>
                          <span className="inline-flex items-center gap-2 text-[#d91f35]">Đọc bài <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/60 p-12 text-center font-body text-black/55">
                Chuyên mục này đang được biên tập. Mời bạn quay lại trong ít phút nữa.
              </div>
            )}
          </div>
        </section>

        <FanClubSection />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
