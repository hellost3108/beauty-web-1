"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3, Facebook, Linkedin, Quote, Twitter, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { magazineEditorialPosts } from "@/data/magazineEditorialData";

const MagazineDetailEditorial = () => {
  const { id } = useParams();
  const router = useRouter();
  const post = magazineEditorialPosts.find((item) => item.id === Number(id));

  useEffect(() => {
    if (!post) router.push("/magazine");
    window.scrollTo(0, 0);
  }, [post, router]);

  if (!post) return null;

  const relatedPosts = magazineEditorialPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  return (
    <div className="magazine-detail-2026 min-h-screen text-[#201c1c]">
      <Navbar />

      <main>
        <header className="px-5 pb-14 pt-[9rem] md:px-8 md:pb-20 md:pt-[11rem]">
          <div className="mx-auto w-full max-w-[90rem]">
            <Link href="/magazine" className="group mb-10 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-black/52 transition-colors hover:text-[#d91f35]" data-reveal="left">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Trở về Tạp chí
            </Link>

            <div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white lg:grid-cols-[0.86fr_1.14fr] lg:rounded-[3rem]" data-reveal="scale">
              <div className="order-2 flex flex-col justify-between p-7 md:p-10 lg:order-1 lg:min-h-[44rem] lg:p-14 xl:p-16">
                <div>
                  <div className="flex items-center justify-between border-b border-black/10 pb-5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black/42">
                    <span>Melalogy · Số 08/2026</span>
                    <span>0{post.id} — 04</span>
                  </div>
                  <span className="mt-10 inline-flex rounded-full bg-[#ee2940] px-4 py-2 font-body text-[0.64rem] font-bold uppercase tracking-[0.15em] text-white">{post.category}</span>
                  <h1 className="mt-6 max-w-3xl font-display text-[clamp(3rem,5.7vw,6.7rem)] leading-[1.04] tracking-[-0.025em]">{post.title}</h1>
                  <p className="mt-7 max-w-xl font-body text-base leading-8 text-black/58">{post.subtitle}</p>
                </div>

                <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-6 font-body text-[0.68rem] uppercase tracking-[0.12em] text-black/45">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#ee2940]" />{post.date}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-[#ee2940]" />{post.readTime}</span>
                  <span className="inline-flex items-center gap-2"><UserRound className="h-3.5 w-3.5 text-[#ee2940]" />{post.author}</span>
                </div>
              </div>

              <div className="relative order-1 min-h-[28rem] overflow-hidden bg-[#e9e1dc] sm:min-h-[38rem] lg:order-2 lg:min-h-full">
                <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                <span className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-black/18 px-4 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">Ảnh · Melalogy Studio</span>
              </div>
            </div>
          </div>
        </header>

        <section className="magazine-article-stage-2026 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid w-full max-w-[78rem] gap-12 lg:grid-cols-[10rem_minmax(0,46rem)_16rem] lg:items-start lg:justify-between lg:gap-10">
            <aside className="hidden h-fit lg:sticky lg:top-32 lg:block" data-reveal="left">
              <span className="block font-body text-[0.63rem] font-bold uppercase tracking-[0.2em] text-black/38">Chia sẻ</span>
              <div className="mt-5 flex flex-col items-start gap-2">
                {[Twitter, Facebook, Linkedin].map((Icon, index) => (
                  <button key={index} type="button" aria-label="Chia sẻ bài viết" className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-black/55 transition-colors hover:border-[#ee2940] hover:bg-[#ee2940] hover:text-white">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <div className="mt-8 border-t border-black/10 pt-5">
                <span className="font-body text-[0.62rem] uppercase tracking-[0.14em] text-black/35">Biên tập bởi</span>
                <strong className="mt-2 block font-display text-xl">{post.author}</strong>
                <span className="mt-1 block font-body text-xs leading-5 text-black/45">{post.role}</span>
              </div>
            </aside>

            <article data-reveal="up">
              <div className="mb-12 rounded-[1.5rem] border border-black/10 bg-white p-7 md:p-9">
                <Quote className="mb-5 h-7 w-7 text-[#ee2940]" />
                <p className="font-display text-2xl leading-[1.2] md:text-3xl">{post.excerpt}</p>
              </div>
              <div className="magazine-prose-2026" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="mt-14 flex flex-col justify-between gap-6 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
                <div>
                  <span className="font-body text-[0.64rem] uppercase tracking-[0.15em] text-black/38">Đã đọc đến cuối</span>
                  <strong className="mt-1 block font-display text-2xl">Cảm ơn bạn đã dành thời gian.</strong>
                </div>
                <Link href="/magazine" className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-[#d91f35]">Xem số Tạp chí <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </article>

            <aside className="h-fit lg:sticky lg:top-32" data-reveal="right" data-reveal-delay="120">
              <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#181515] p-3 text-white">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[#dff4fb]">
                  <Image src="/assets/mask-hydrating-blue.png" alt="Mặt nạ Energy Shot Cấp Ẩm" fill sizes="16rem" className="object-cover" />
                </div>
                <div className="p-4">
                  <span className="font-body text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#ff6979]">Từ Melalogy Lab</span>
                  <h2 className="mt-3 font-display text-2xl">Energy Shot Cấp Ẩm</h2>
                  <p className="mt-2 font-body text-xs leading-5 text-white/55">Hyaluronic Acid · Ceramide NP</p>
                  <Link href="/product/1" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-body text-xs font-semibold text-black">Khám phá sản phẩm <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="magazine-related-2026 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="mb-10 border-b border-black/10 pb-7" data-reveal="up">
              <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-[#ee2940]">Đọc tiếp</p>
              <h2 className="font-display text-4xl md:text-6xl">Trong cùng số báo</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3" data-motion-stagger>
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/magazine/${relatedPost.id}`} className="magazine-related-card-2026 group overflow-hidden rounded-[1.5rem] border border-black/10 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={relatedPost.image} alt={relatedPost.imageAlt} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-6">
                    <p className="font-body text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-[#d91f35]">{relatedPost.category}</p>
                    <h3 className="mt-3 font-display text-2xl leading-[1.12]">{relatedPost.title}</h3>
                    <span className="mt-6 inline-flex items-center gap-2 font-body text-xs font-semibold text-[#d91f35]">Đọc bài <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
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

export default MagazineDetailEditorial;
