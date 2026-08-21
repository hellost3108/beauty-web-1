"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { magazinePosts } from '@/data/magazineData';
import { useToast } from '@/hooks/use-toast';

const Magazine = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const featuredPost = magazinePosts[0];
    const sidePosts = magazinePosts.slice(1, 3);
    const focusPosts = magazinePosts.slice(3, 5); // New section posts
    const gridPosts = magazinePosts.slice(5);     // Remaining posts

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        // Success toast
        toast({
            title: "Đăng Ký Thành Công! 🎉",
            description: "Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi.",
        });

        // Clear the email input
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Navbar />

            {/* Editorial Header */}
            <header className="pt-[120px] pb-12 md:pt-[160px] md:pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-[#1a1a1a] font-display text-lg tracking-wide uppercase mb-4 block">Số Báo Điện Tử</span>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl mb-6">
                        <span className="text-[#1a1a1a]">Melalogy </span>
                        <span className="text-[#1a1a1a]">Magazine</span>
                    </h1>
                    <div className="flex justify-center gap-8 text-sm uppercase tracking-widest font-body font-medium text-[#666]">
                        <span>Làm Đẹp</span>
                        <span className="text-[#f01a33]">•</span>
                        <span>Văn Hoá</span>
                        <span className="text-[#f01a33]">•</span>
                        <span>Phong Cách Sống</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                {/* Featured Section: Magazine Cover Style */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
                    {/* Main Cover Story */}
                    <div className="lg:col-span-8 group cursor-pointer reveal-2026">
                        <Link href={`/magazine/${featuredPost.id}`}>
                            <div className="media-frame-2026 relative flex justify-center mb-6 rounded-[28px] overflow-hidden aspect-[16/10]">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    width={1600}
                                    height={1000}
                                    fetchPriority="high"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]"
                                />
                            </div>
                            <div className="max-w-3xl">
                                <span className="inline-block px-4 py-1.5 bg-[#f01a33] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                    {featuredPost.category}
                                </span>
                                <h2 className="font-display text-3xl md:text-5xl mb-4 leading-tight group-hover:text-[#f01a33] transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="font-body text-xl text-[#666] mb-4 leading-relaxed">
                                    {featuredPost.subtitle}
                                </p>
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#999] font-body">
                                    <span>Bởi {featuredPost.author}</span>
                                    <span>—</span>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Sidebar Posts - Sticky */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-12 lg:pl-8 h-fit">
                        <div>
                            <span className="inline-block text-xs font-display font-bold uppercase tracking-wider text-[#1a1a1a] mb-8 border-b-2 border-[#f01a33] pb-2">
                                Bài Viết Nổi Bật
                            </span>
                            <div className="flex flex-col gap-10">
                                {sidePosts.map((post) => (
                                    <Link key={post.id} href={`/magazine/${post.id}`} className="group block">
                                        <div className="media-frame-2026 relative mb-4 rounded-[24px] overflow-hidden aspect-[4/3]">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                width={800}
                                                height={600}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold uppercase text-[#e7406e] tracking-wider font-body">
                                                {post.category}
                                            </span>
                                            <h3 className="font-display text-xl leading-tight group-hover:text-[#f01a33] transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="font-body text-[#666] text-sm line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#fcfcfc] p-8 border border-gray-100 rounded-[24px] text-center">
                            <h3 className="font-display text-2xl mb-2 text-[#1a1a1a]">Bản Tin</h3>
                            <p className="font-body text-sm text-[#666] mb-6">Tuyển chọn làm đẹp hàng tuần, gửi thẳng đến hộp thư của bạn.</p>
                            <form onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Địa chỉ email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border border-gray-200 p-3 text-sm text-[#1a1a1a] placeholder:text-gray-400 mb-4 focus:outline-none focus:border-[#f01a33] transition-colors rounded-lg"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] text-white font-bold uppercase text-xs tracking-widest py-3 hover:bg-[#f01a33] transition-colors rounded-lg"
                                >
                                    Đăng Ký
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* In Focus Section */}
                {focusPosts.length > 0 && (
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-[#e7406e] font-display text-sm tracking-wide uppercase mb-2 block">Lựa Chọn Của Biên Tập Viên</span>
                        <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a]">Tiêu Điểm</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        {focusPosts.map((post) => (
                            <Link key={post.id} href={`/magazine/${post.id}`} className="editorial-card-2026 reveal-2026 group flex flex-col h-full overflow-hidden">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        width={800}
                                        height={600}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 flex flex-col grow justify-between">
                                    <div>
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#e7406e] mb-3">
                                            {post.category}
                                        </span>
                                        <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-[#f01a33] transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="font-body text-[#666] leading-relaxed mb-6">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/60 pt-6 border-t border-gray-100">
                                        <Clock className="w-3 h-3" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
                )}

                {/* Grid Layout for remaining posts */}
                {gridPosts.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-4">
                            <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a]">Bài Viết Mới Nhất</h2>
                            <Link href="#" className="flex items-center gap-2 text-[#f01a33] font-medium hover:opacity-80 transition-opacity">
                                Xem Lưu Trữ <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                            {gridPosts.map((post) => (
                                <Link key={post.id} href={`/magazine/${post.id}`} className="group block">
                                    <div className="mb-6 bg-[#fcfcfc] rounded-[2px] overflow-hidden aspect-[4/3] border border-gray-100">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            width={800}
                                            height={600}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#e7406e] font-body">{post.category}</span>
                                    </div>
                                    <h3 className="font-display text-2xl mb-4 group-hover:text-[#f01a33] transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="font-body text-[#666] mb-6 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#999] font-body">
                                        <Clock className="w-3 h-3" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Magazine;
