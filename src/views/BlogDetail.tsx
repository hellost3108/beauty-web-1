"use client";

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/data/blogData';

const BlogDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const post = blogPosts.find(p => p.id === Number(id));

    useEffect(() => {
        if (!post) {
            router.push('/blog');
        }
        window.scrollTo(0, 0);
    }, [post, router]);

    if (!post) return null;

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Navbar />

            {/* Hero Section - Optimized for Landscape Images */}
            {/* Using aspect-video or fixed height with object-cover assures full width without awkward letterboxing */}
            <div className="relative w-full h-[50vh] md:h-[60vh] mt-[72px]">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl px-6 text-center text-white">
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-6">
                            {post.category}
                        </span>
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm md:text-base font-body">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[#666666] hover:text-[#e7406e] mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                <div
                    className="prose prose-lg max-w-none text-justify prose-headings:font-display prose-headings:font-medium prose-headings:mt-10 prose-headings:mb-4 prose-p:font-body prose-p:text-[#666666] prose-p:leading-loose prose-p:mb-6 prose-a:text-[#e7406e] prose-img:rounded-[20px] prose-li:font-body prose-li:text-[#666666] prose-li:mb-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            {/* Related Posts */}
            <section className="bg-[#fcfcfc] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-display text-3xl mb-12 text-center">
                        <span className="text-[#1a1a1a]">Read </span>
                        <span className="text-[#f01a33]">Next</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts
                            .filter(p => p.id !== post.id)
                            .slice(0, 3)
                            .map(relatedPost => (
                                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block">
                                    <div className="relative overflow-hidden rounded-[20px] aspect-[16/9] mb-4">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="font-display text-xl mb-2 group-hover:text-[#e7406e] transition-colors line-clamp-2 min-h-[3.5rem]">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-[#666666] line-clamp-2">
                                        {relatedPost.excerpt}
                                    </p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogDetail;
