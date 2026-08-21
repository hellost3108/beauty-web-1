"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Mail, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { magazineEditorialPosts } from "@/data/melalogyMagazinePosts";
import { useToast } from "@/hooks/use-toast";

const magazineCardLayouts = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-12 lg:grid lg:grid-cols-[0.45fr_0.55fr]",
];

const MagazineEditorial = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const featuredPost = magazineEditorialPosts[0];
  const latestPosts = magazineEditorialPosts.slice(1);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Đã đăng ký Melalogy Notes",
      description: "Bản tuyển chọn mới sẽ được gửi đến hộp thư của bạn.",
    });
    setEmail("");
  };

  return (
    <div className="magazine-page-2026 min-h-screen text-[#201c1c]">
      <Navbar />

      <main>
        <section className="magazine-hero-2026 relative overflow-hidden px-5 pb-14 pt-[8.6rem] md:px-8 md:pb-20 md:pt-[10.5rem]">
          <div className="magazine-orbit-2026" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[90rem]">
            <div className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
              <div data-reveal="clip">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2 font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5 text-[#ee2940]" />
                  Số 08 · Tháng 8/2026
                </div>
                <h1 className="magazine-title-2026 max-w-5xl font-display text-[clamp(3.7rem,8.2vw,8.7rem)] leading-[1.04] tracking-[-0.025em]">
                  Tạp chí của <span className="magazine-title-accent-2026 text-[#ee2940]">làn da.</span>
                </h1>
              </div>

              <div className="lg:border-l lg:border-black/10 lg:pl-8" data-reveal="right" data-reveal-delay="100">
                <p className="max-w-md font-body text-base leading-8 text-black/58">
                  Khoa học, văn hóa và những góc nhìn đẹp hơn về cách người Việt chăm sóc làn da mỗi ngày.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-body text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-black/42">
                  <span>Khoa học</span><span>Văn hóa</span><span>Chân dung</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto w-full max-w-[90rem]">
            <Link
              href={`/magazine/${featuredPost.id}`}
              className="magazine-cover-2026 group grid overflow-hidden rounded-[2rem] bg-[#181515] text-white lg:grid-cols-[0.78fr_1.22fr] lg:rounded-[3rem]"
              data-reveal="scale"
            >
              <div className="magazine-cover-copy-2026 order-2 flex min-h-[34rem] flex-col justify-between p-7 sm:p-10 lg:order-1 lg:min-h-[42rem] lg:p-14 xl:p-16">
                <div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-5 font-body text-[0.65rem] uppercase tracking-[0.18em] text-white/48">
                    <span>Câu chuyện trang bìa</span>
                    <span>01 — 09</span>
                  </div>
                  <span className="mt-10 inline-flex rounded-full bg-[#ee2940] px-4 py-2 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em]">
                    {featuredPost.category}
                  </span>
                  <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.8rem,5.2vw,5.7rem)] leading-[1.07] tracking-[-0.022em]">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-7 max-w-xl font-body text-sm leading-7 text-white/62 md:text-base md:leading-8">
                    {featuredPost.subtitle}
                  </p>
                </div>

                <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6">
                  <div className="flex flex-wrap gap-5 font-body text-[0.68rem] uppercase tracking-[0.12em] text-white/48">
                    <span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#ff5a6d]" />{featuredPost.date}</span>
                    <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-[#ff5a6d]" />{featuredPost.readTime}</span>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>

              <div className="magazine-cover-media-2026 relative order-1 min-h-[25rem] overflow-hidden bg-[#e8dfd8] sm:min-h-[34rem] lg:order-2 lg:min-h-full" data-scroll-media="true">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/5" />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/18 px-4 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md md:bottom-7 md:left-7">
                  Melalogy Studio · 2026
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="magazine-index-2026 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-black/10 pb-7 md:flex-row md:items-end">
              <div data-reveal="up">
                <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-[#ee2940]">Từ ban biên tập</p>
                <h2 className="font-display text-4xl md:text-6xl">Tám lát cắt mới</h2>
              </div>
              <p className="max-w-md font-body text-sm leading-7 text-black/52 md:text-right">
                Những câu chuyện ngắn để hiểu làn da, thiết kế và vẻ đẹp Việt theo một cách gần gũi hơn.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12" data-motion-stagger>
              {latestPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/magazine/${post.id}`}
                  className={`magazine-card-2026 group overflow-hidden rounded-[1.75rem] border border-black/10 bg-white ${magazineCardLayouts[index % magazineCardLayouts.length]}`}
                >
                  <div className={`magazine-card-media-2026 relative overflow-hidden ${index === 7 ? "min-h-[23rem]" : "aspect-[4/3]"}`}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      loading="lazy"
                      sizes={index === 7 ? "(max-width: 1024px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 50vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 font-body text-[0.64rem] font-bold uppercase tracking-[0.15em] backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                  <div className="magazine-card-copy-2026 flex flex-col justify-between p-7 md:p-9">
                    <div>
                      <p className="font-body text-[0.66rem] uppercase tracking-[0.14em] text-black/42">0{post.id} · {post.readTime}</p>
                      <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.75rem)] leading-[1.12] tracking-[-0.015em] transition-colors group-hover:text-[#d91f35]">
                        {post.title}
                      </h3>
                      <p className="mt-5 font-body text-sm leading-7 text-black/55 md:text-base">{post.excerpt}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                      <span className="font-body text-xs font-semibold">{post.author}</span>
                      <ArrowRight className="h-4 w-4 text-[#ee2940] transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="magazine-newsletter-2026 mx-auto grid w-full max-w-[90rem] overflow-hidden rounded-[2rem] bg-[#ee2940] text-white md:grid-cols-[0.7fr_1.3fr] md:rounded-[3rem]" data-reveal="scale">
            <div className="flex min-h-[17rem] flex-col justify-between border-b border-white/20 p-8 md:border-b-0 md:border-r md:p-12">
              <Mail className="h-7 w-7" />
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Melalogy Notes · Mỗi tháng</p>
            </div>
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.07] tracking-[-0.022em]">Một lá thư đẹp, không làm đầy hộp thư.</h2>
              <p className="mt-5 max-w-xl font-body text-sm leading-7 text-white/72 md:text-base">Bài đọc mới, kiến thức chăm da và những câu chuyện hậu trường được tuyển chọn vừa đủ.</p>
              <form onSubmit={handleSubscribe} className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                <label htmlFor="magazine-email" className="sr-only">Địa chỉ email</label>
                <input
                  id="magazine-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@cuaban.vn"
                  className="min-h-14 flex-1 rounded-full border border-white/35 bg-white/12 px-6 font-body text-sm text-white outline-none placeholder:text-white/50 focus:border-white"
                />
                <button type="submit" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 font-body text-sm font-semibold text-[#201c1c] transition-transform hover:-translate-y-0.5">
                  Nhận số mới <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MagazineEditorial;
