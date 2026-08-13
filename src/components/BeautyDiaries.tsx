import { Star, CheckCircle2 } from 'lucide-react';
import { RateReviewModal } from '@/components/RateReviewModal';

const reviews = [
    {
        id: 1,
        text: "Minimal packaging, maximum results. My skin looks healthier and more radiant within days.",
        author: "Alkin Yadev",
        role: "Verified user",
        image: "/assets/placeholder-150x150.png",
    },
    {
        id: 2,
        text: "Elegant, lightweight, and effective. Blushora is now a staple in my routine.",
        author: "Jimmy Sharma",
        role: "Verified user",
        image: "/assets/placeholder-150x150.png",
    },
    {
        id: 3,
        text: "Effortless glow, beautiful textures, and truly premium quality. Blushora feels luxurious and performs even better.",
        author: "Gulfan Ivy",
        role: "Verified user",
        image: "/assets/placeholder-150x150.png",
    },
];



const BeautyDiaries = () => {
    return (
        <section className="py-24 bg-[#fff5f5]">
            <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                <div className="relative mb-16">
                    <div className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a]">
                            The Beauty <span className="text-[#f01a33]">Diaries</span>
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
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300">
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
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                    <img
                                        src={review.image}
                                        alt={review.author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display font-semibold text-[#1a1a1a] text-base">
                                        {review.author}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                                        <span className="font-body text-xs text-[#888888]">
                                            {review.role}
                                        </span>
                                    </div>
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
