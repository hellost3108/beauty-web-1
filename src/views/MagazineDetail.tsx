"use client";

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, User } from 'lucide-react';
import { magazinePosts } from '@/data/magazineData';
import { useShop } from '@/context/ShopContext';

const MagazineDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useShop();
    const post = magazinePosts.find(p => p.id === Number(id));

    useEffect(() => {
        if (!post) {
            router.push('/magazine');
        }
        window.scrollTo(0, 0);
    }, [post, router]);

    if (!post) return null;

    return (
        <div className="min-h-screen bg-white text-[#111111]">
            <Navbar />

            {/* Editorial Header - Consistent with Magazine List */}
            <div className="pt-[120px] pb-12 md:pt-[160px] max-w-5xl mx-auto px-6 text-center">
                <Link
                    href="/magazine"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999] hover:text-[#b31324] mb-12 transition-colors font-body"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Quay Lại Magazine
                </Link>

                <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-[#fcfcfc] border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#e7406e] mb-6 font-body">
                        {post.category}
                    </span>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 text-[#111111]">
                        {post.title}
                    </h1>
                    <p className="font-body text-xl md:text-2xl text-[#666] max-w-3xl mx-auto leading-relaxed">
                        {post.subtitle}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-8 border-y border-gray-100 py-6 max-w-3xl mx-auto">
                    <div className="text-left">
                        <span className="block text-[10px] text-[#999] uppercase tracking-widest font-bold mb-1 font-body">Bài Viết Bởi</span>
                        <span className="font-display text-lg text-[#111111]">{post.author}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-left">
                        <span className="block text-[10px] text-[#999] uppercase tracking-widest font-bold mb-1 font-body">Ngày Đăng</span>
                        <span className="font-display text-lg text-[#111111]">{post.date}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-left">
                        <span className="block text-[10px] text-[#999] uppercase tracking-widest font-bold mb-1 font-body">Thời Gian Đọc</span>
                        <span className="font-display text-lg text-[#111111]">{post.readTime}</span>
                    </div>
                </div>
            </div>

            {/* Large Hero Image - Full Visibility */}
            <div className="w-full max-w-7xl mx-auto mb-12 px-6">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[24px] border border-gray-100 shadow-sm">
                <img
                    src={post.image}
                    alt={post.title}
                    width={1600}
                    height={1000}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 md:py-24">

                {/* Social Share - Sticky Sidebar */}
                <aside className="lg:col-span-1 hidden lg:flex flex-col items-center sticky top-32 h-fit space-y-8">
                    <div className="w-px h-12 bg-gray-200"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 text-[#999] font-body">Chia Sẻ Bài Viết</span>
                    <button className="p-3 rounded-full hover:bg-gray-50 text-[#666] hover:text-[#b31324] transition-colors"><Twitter className="w-4 h-4" /></button>
                    <button className="p-3 rounded-full hover:bg-gray-50 text-[#666] hover:text-[#b31324] transition-colors"><Facebook className="w-4 h-4" /></button>
                    <button className="p-3 rounded-full hover:bg-gray-50 text-[#666] hover:text-[#b31324] transition-colors"><Linkedin className="w-4 h-4" /></button>
                    <div className="w-px h-full bg-gray-200 grow"></div>
                </aside>

                {/* Article Content */}
                <article className="lg:col-span-8">
                    <div
                        className="prose prose-lg max-w-none 
                        prose-headings:font-display prose-headings:font-medium prose-headings:text-[#111111]
                        prose-p:font-body prose-p:text-[#666] prose-p:leading-loose
                        prose-blockquote:font-display prose-blockquote:text-3xl prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-[#b31324] prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:text-[#111111] prose-blockquote:my-12
                        prose-strong:text-[#111111] prose-strong:font-bold
                        prose-a:text-[#e7406e] hover:prose-a:text-[#b31324] prose-a:transition-colors
                        prose-img:rounded-[24px] prose-img:border prose-img:border-gray-100"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center text-[#999]">
                                {/* Placeholder user avatar */}
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block font-bold text-sm text-[#111111] font-body">Viết bởi {post.author}</span>
                                <span className="text-xs text-[#666] uppercase tracking-wider font-body">{post.role}</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Right Sidebar - Related/Shop */}
                <aside className="lg:col-span-3 block mt-12 lg:mt-0 sticky top-32 h-fit">
                    <div className="bg-[#fcfcfc] p-6 rounded-[24px] border border-gray-100 text-center w-full max-w-sm mx-auto lg:max-w-none">
                        <h4 className="font-display text-xl mb-4 text-[#111111]">Mua Sắm Phong Cách Này</h4>
                        <div className="aspect-square bg-white mb-4 overflow-hidden rounded-[16px]">
                            {/* Placeholder product image */}
                            <img src="/assets/placeholder-400x500.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h5 className="font-bold text-sm mb-1 font-display text-[#111111]">Velvet Gaze Lipstick</h5>
                        <p className="text-xs text-[#666] mb-4 font-body">₹2,499.00</p>
                        <button
                            onClick={() => addToCart({
                                id: 1,
                                name: 'Velvet Gaze Lipstick',
                                price: '₹2,499.00',
                                image: '/assets/placeholder-400x500.png'
                            })}
                            className="w-full bg-[#111111] text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#b31324] transition-colors rounded-lg font-body"
                        >
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </aside>

            </main>

            <Footer />
        </div>
    );
};

export default MagazineDetail;
