'use client';

import { Star } from 'lucide-react';
import { RateReviewModal } from '@/components/RateReviewModal';
import { useSection } from '@/components/cms/SectionsProvider';

const BeautyDiaries = () => {
    const content = useSection('shop.reviews');
    const reviews = content.reviews;
    if (reviews.length === 0) return null;

    return (
        <section className="py-24 bg-[#fff5f5]">
            <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                <div className="relative mb-16">
                    <div data-reveal="up" className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl text-[#111111]">
                            {content.title}{' '}
                            {content.titleAccent && <span className="text-[#b31324]">{content.titleAccent}</span>}
                        </h2>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <RateReviewModal />
                    </div>
                    <div className="mt-6 md:hidden flex justify-center">
                        <RateReviewModal />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            data-reveal="scale"
                            data-reveal-delay={String(index * 110)}
                            className="bg-white p-8 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-[#d4af37] fill-[#d4af37] stroke-none" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="font-body text-[#4a4a4a] text-sm leading-relaxed mb-8 min-h-[60px]">
                                {review.text}
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <div
                                    aria-hidden="true"
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-body text-xs font-semibold tracking-[0.08em] text-[#111111]"
                                    style={{ backgroundColor: review.tone || '#f7d9d9' }}
                                >
                                    {review.initials}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display font-semibold text-[#111111] text-base">
                                        {review.author}
                                    </span>
                                    <span className="font-body text-xs text-[#888888]">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default BeautyDiaries;
