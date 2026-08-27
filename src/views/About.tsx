import Link from 'next/link';
import {
    ArrowDown,
    ArrowUpRight,
    Droplets,
    FlaskConical,
    Layers3,
    ScanLine,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { AboutPageContent } from '@/data/aboutContent';

const principleIcons = [ScanLine, FlaskConical, Layers3];

const collection = [
    {
        index: '01',
        name: 'Cấp Ẩm',
        signal: 'Khi da thiếu nước và cần cảm giác mềm dịu.',
        image: '/assets/mask-hydrating-blue.png',
        tone: '#dff4fb',
    },
    {
        index: '02',
        name: 'Phục Hồi',
        signal: 'Khi hàng rào da cần một nhịp chăm sóc tối giản.',
        image: '/assets/mask-recovery-green.png',
        tone: '#eef7d9',
    },
    {
        index: '03',
        name: 'Làm Sáng',
        signal: 'Khi làn da trông kém tươi và thiếu sức sống.',
        image: '/assets/mask-brightening-yellow.png',
        tone: '#fff8c8',
    },
    {
        index: '04',
        name: 'Rạng Rỡ',
        signal: 'Khi bạn muốn làn da trông mượt mà, tươi sáng hơn.',
        image: '/assets/mask-radiance-purple.png',
        tone: '#eee5f8',
    },
];

const valueIcons = [ShieldCheck, Droplets, Sparkles];

const About = ({ content }: { content: AboutPageContent }) => {
    return (
        <main className="min-h-screen overflow-x-clip bg-[#f7f3f0] text-[#191817]">
            <Navbar />

            <section className="pt-[72px]" aria-labelledby="about-hero-title">
                <div className="grid min-h-[calc(100svh-72px)] lg:grid-cols-[0.96fr_1.04fr]">
                    <div className="relative flex flex-col justify-between px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-24">
                        <div
                            data-reveal="fade"
                            className="flex items-center justify-between border-b border-black/15 pb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55"
                        >
                            <span>Melalogy</span>
                            <span>The science of melanin</span>
                        </div>

                        <div className="my-16 max-w-[42rem] lg:my-10">
                            <p
                                data-reveal="up"
                                className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1835]"
                            >
                                {content.hero.eyebrow}
                            </p>
                            <h1
                                id="about-hero-title"
                                data-reveal="up"
                                data-reveal-delay="90"
                                className="vi-display-safe font-display text-[clamp(3rem,5vw,6rem)] tracking-[-0.025em]"
                            >
                                {content.hero.title}{' '}
                                <span className="text-[#ed1835]">{content.hero.highlightedText}</span>
                            </h1>
                            <p
                                data-reveal="up"
                                data-reveal-delay="180"
                                className="mt-8 max-w-xl font-body text-base leading-7 text-black/62 md:text-lg md:leading-8"
                            >
                                {content.hero.body}
                            </p>

                            <div
                                data-reveal="up"
                                data-reveal-delay="260"
                                className="mt-9 flex flex-wrap items-center gap-4"
                            >
                                <Link
                                    href="/collection"
                                    className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ed1835] px-6 font-body text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1"
                                >
                                    Khám phá Energy Shot
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                <a
                                    href="#brand-premise"
                                    className="inline-flex min-h-12 items-center gap-3 rounded-full border border-black/20 px-6 font-body text-sm font-semibold transition-colors hover:border-black hover:bg-white"
                                >
                                    Đọc câu chuyện
                                    <ArrowDown className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div
                            data-reveal="fade"
                            data-reveal-delay="320"
                            className="grid grid-cols-2 gap-4 border-t border-black/15 pt-5 font-body text-xs text-black/55"
                        >
                            <p>01 — Tín hiệu của da</p>
                            <p>04 — Công thức lựa chọn</p>
                        </div>
                    </div>

                    <div data-reveal="scale" className="relative min-h-[68svh] overflow-hidden bg-[#c4202f] lg:min-h-0">
                        <img
                            data-parallax="10"
                            src={content.hero.imageUrl}
                            alt={content.hero.imageAlt}
                            width="2244"
                            height="2804"
                            fetchPriority="high"
                            decoding="async"
                            className="absolute -inset-y-[7%] left-0 h-[114%] w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
                        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between rounded-[1.4rem] border border-white/30 bg-black/15 p-5 text-white backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-6">
                            <div>
                                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                                    Brand premise
                                </p>
                                <p className="vi-display-safe mt-2 max-w-none font-display text-[clamp(1.45rem,1.8vw,2.1rem)] lg:whitespace-nowrap">
                                    {content.hero.imageCaption}
                                </p>
                            </div>
                            <span className="font-body text-xs text-white/70">2026</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="brand-premise" className="bg-white px-6 py-24 sm:px-10 md:py-32 lg:px-16 xl:px-24">
                <div className="mx-auto max-w-[90rem]">
                    <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-20">
                        <div data-reveal="left" className="flex items-start gap-4">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ed1835]" />
                            <div>
                                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-black/45">{content.premise.eyebrow}</p>
                                <p className="mt-2 font-body text-sm text-black/60">Điểm bắt đầu của Melalogy</p>
                            </div>
                        </div>

                        <div>
                            <h2 data-reveal="up" className="vi-display-safe max-w-5xl font-display text-[clamp(2.65rem,5.1vw,5.5rem)] tracking-[-0.022em]">
                                {content.premise.title}{' '}
                                <span className="text-black/30">{content.premise.highlightedText}</span>
                            </h2>
                            <div className="mt-14 grid gap-8 border-t border-black/15 pt-8 md:grid-cols-2 md:gap-12">
                                <div data-reveal="up" data-reveal-delay="90">
                                    <p className="font-display text-2xl">{content.premise.signalTitle}</p>
                                    <p className="mt-4 max-w-md font-body text-base leading-7 text-black/58">
                                        {content.premise.signalBody}
                                    </p>
                                </div>
                                <div data-reveal="up" data-reveal-delay="180">
                                    <p className="font-display text-2xl">{content.premise.answerTitle}</p>
                                    <p className="mt-4 max-w-md font-body text-base leading-7 text-black/58">
                                        {content.premise.answerBody}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-[#181716] px-6 py-24 text-white sm:px-10 md:py-32 lg:px-16 xl:px-24">
                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#ed1835]/20 blur-[120px]" />
                <div className="relative mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
                    <div data-reveal="left" className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-[#ded7d0] md:min-h-[44rem]">
                        <img
                            data-parallax="8"
                            src={content.thinking.imageUrl}
                            alt={content.thinking.imageAlt}
                            width="1944"
                            height="3238"
                            loading="lazy"
                            decoding="async"
                            className="absolute -inset-y-[6%] left-0 h-[112%] w-full object-cover object-center"
                        />
                        <div className="absolute inset-x-5 top-5 flex items-center justify-between rounded-full border border-white/30 bg-black/15 px-5 py-3 font-body text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md sm:inset-x-7 sm:top-7">
                            <span>Form follows skin</span>
                            <span>02 / 04</span>
                        </div>
                    </div>

                    <div>
                        <p data-reveal="up" className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#ff6174]">
                            {content.thinking.eyebrow}
                        </p>
                        <h2 data-reveal="up" data-reveal-delay="90" className="vi-display-safe mt-6 max-w-2xl font-display text-[clamp(2.55rem,4.3vw,4.75rem)] tracking-[-0.022em]">
                            {content.thinking.title}
                        </h2>
                        <p data-reveal="up" data-reveal-delay="170" className="mt-7 max-w-xl font-body text-base leading-7 text-white/62 md:text-lg md:leading-8">
                            {content.thinking.body}
                        </p>

                        <div className="mt-12 divide-y divide-white/15 border-y border-white/15">
                            {content.thinking.principles.map((principle, index) => {
                                const Icon = principleIcons[index % principleIcons.length];
                                return (
                                    <div
                                        key={`${principle.title}-${index}`}
                                        data-reveal="right"
                                        data-reveal-delay={String(index * 100)}
                                        className="grid grid-cols-[auto_1fr] gap-5 py-6"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#ff6174]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-body text-base font-semibold tracking-tight">{principle.title}</h3>
                                            <p className="mt-2 max-w-lg font-body text-sm leading-6 text-white/55">{principle.body}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f7f3f0] px-6 py-24 sm:px-10 md:py-32 lg:px-16 xl:px-24">
                <div className="mx-auto max-w-[90rem]">
                    <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                            <p data-reveal="up" className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1835]">
                                {content.collection.eyebrow}
                            </p>
                            <h2 data-reveal="up" data-reveal-delay="90" className="vi-display-safe mt-5 max-w-3xl font-display text-[clamp(2.55rem,4.3vw,4.8rem)] tracking-[-0.022em]">
                                {content.collection.title}
                            </h2>
                        </div>
                        <p data-reveal="fade" className="max-w-sm font-body text-sm leading-6 text-black/55 md:text-right">
                            {content.collection.body}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {collection.map((item, index) => (
                            <Link
                                href="/collection"
                                key={item.name}
                                data-reveal="scale"
                                data-reveal-delay={String(index * 90)}
                                className="group overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_25px_80px_-55px_rgba(0,0,0,0.45)]"
                            >
                                <div className="relative aspect-[4/4.5] overflow-hidden" style={{ backgroundColor: item.tone }}>
                                    <img
                                        src={item.image}
                                        alt={`Energy Shot ${item.name}`}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                                    />
                                    <span className="absolute left-5 top-5 rounded-full border border-black/15 bg-white/75 px-3 py-1.5 font-body text-[10px] font-semibold tracking-[0.18em] backdrop-blur-md">
                                        {item.index}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="font-display text-3xl">{item.name}</h3>
                                        <ArrowUpRight className="h-5 w-5 text-[#ed1835] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                    <p className="mt-3 font-body text-sm leading-6 text-black/55">{item.signal}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-6 py-24 sm:px-10 md:py-32 lg:px-16 xl:px-24">
                <div className="mx-auto max-w-[90rem]">
                    <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
                        <div>
                            <p data-reveal="left" className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1835]">
                                {content.values.eyebrow}
                            </p>
                            <h2 data-reveal="left" data-reveal-delay="90" className="vi-display-safe mt-5 font-display text-4xl md:text-5xl">
                                {content.values.title}
                            </h2>
                        </div>

                        <div className="divide-y divide-black/12 border-y border-black/12">
                            {content.values.items.map((value, index) => {
                                const Icon = valueIcons[index % valueIcons.length];
                                return (
                                    <div
                                        key={`${value.title}-${index}`}
                                        data-reveal="up"
                                        data-reveal-delay={String(index * 100)}
                                        className="grid gap-5 py-8 sm:grid-cols-[auto_0.4fr_0.6fr] sm:items-start sm:gap-8"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f2] text-[#ed1835]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-display text-2xl">{value.title}</h3>
                                        <p className="max-w-lg font-body text-sm leading-6 text-black/55">{value.body}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#ed1835] px-6 py-24 text-white sm:px-10 md:py-32 lg:px-16 xl:px-24">
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/25" />
                <div className="pointer-events-none absolute -bottom-40 left-[12%] h-96 w-96 rounded-full border border-white/15" />
                <div className="relative mx-auto max-w-[90rem] text-center">
                    <p data-reveal="fade" className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                        {content.cta.eyebrow}
                    </p>
                    <h2 data-reveal="up" data-reveal-delay="90" className="vi-display-safe mx-auto mt-6 max-w-5xl font-display text-[clamp(2.8rem,5.8vw,6.1rem)] tracking-[-0.022em]">
                        {content.cta.title}
                    </h2>
                    <Link
                        href={content.cta.buttonUrl}
                        data-reveal="up"
                        data-reveal-delay="180"
                        className="group mt-10 inline-flex min-h-13 items-center gap-3 rounded-full bg-white px-7 py-4 font-body text-sm font-semibold text-[#191817] transition-transform duration-300 hover:-translate-y-1"
                    >
                        {content.cta.buttonLabel}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default About;
