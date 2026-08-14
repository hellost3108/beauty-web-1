"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FanClubSection from '@/components/FanClubSection';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogData';

const Blog = () => {
    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full pt-[120px] pb-12 md:pt-[160px] md:pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#fff5f6_0%,_#ffffff_70%)]" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <span className="text-[#e7406e] font-display text-lg tracking-wide uppercase mb-4 block">Nhật Ký Của Chúng Tôi</span>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                        <span className="text-[#1a1a1a]">Góc </span>
                        <span className="text-[#f01a33]">Làm Đẹp</span>
                    </h1>
                    <p className="font-body text-[#666666] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Lời khuyên từ chuyên gia, hướng dẫn chăm sóc da và những câu chuyện làm đẹp giúp bạn toả sáng từ bên trong.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12 md:py-20 bg-[#fcfcfc]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {blogPosts.map((post) => (
                            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer">
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1a1a1a] shadow-sm">
                                        {post.category}
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col p-8">
                                    <div className="flex items-center gap-4 text-xs text-[#888888] mb-4 font-body uppercase tracking-wide">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#f01a33]" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-[#f01a33]" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>
                                    <h2 className="font-display text-2xl mb-3 leading-tight text-[#1a1a1a] group-hover:text-[#f01a33] transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="font-body text-[#666666] mb-6 line-clamp-3 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div
                                        className="inline-flex items-center gap-2 text-[#1a1a1a] font-medium hover:text-[#f01a33] transition-colors mt-auto group/link"
                                    >
                                        <span className="relative">
                                            Đọc Thêm
                                            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#f01a33] transition-all duration-300 group-hover/link:w-full"></span>
                                        </span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 text-[#f01a33]" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FanClubSection />
            <Footer />
        </div>
    );
};

export default Blog;
