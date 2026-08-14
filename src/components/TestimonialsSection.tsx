import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
    {
        name: 'Alkin Yadav',
        role: 'Người dùng đã xác minh',
        quote: 'Bao bì tối giản, hiệu quả tối đa. Làn da tôi trông khoẻ khoắn và rạng rỡ hơn chỉ sau vài ngày.',
        stars: 5,
        avatar: '/assets/placeholder-150x150.png'
    },
    {
        name: 'Jimmy Sharma',
        role: 'Người dùng đã xác minh',
        quote: 'Thanh lịch, nhẹ nhàng và hiệu quả. Melalogy giờ là sản phẩm không thể thiếu trong chu trình chăm sóc da của tôi.',
        stars: 4,
        avatar: '/assets/placeholder-150x150.png'
    },
    {
        name: 'Gulfan Ivy',
        role: 'Người dùng đã xác minh',
        quote: 'Làn da rạng rỡ tự nhiên, kết cấu mịn màng và chất lượng cao cấp thực sự. Melalogy vừa sang trọng vừa hiệu quả vượt mong đợi.',
        stars: 4,
        avatar: '/assets/placeholder-150x150.png'
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-[#fff8f9]">
            <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl leading-none tracking-tight">
                        <span className="text-[#1a1a1a]">Được </span>
                        <span className="text-[#f01a33]">Hàng Nghìn Người Tin Dùng</span>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-16">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`bg-white p-8 md:p-10 rounded-[20px] shadow-sm flex flex-col justify-between h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                            <div className="space-y-6">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`w-5 h-5 ${idx < t.stars ? 'fill-[#c5a35d] text-[#c5a35d]' : 'text-[#e2e2e2]'}`}
                                        />
                                    ))}
                                </div>
                                {/* Quote */}
                                <p className="font-body text-[#1a1a1a] text-base leading-relaxed">
                                    {t.quote}
                                </p>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-4 mt-10">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                    <h4 className="font-display font-medium text-[#1a1a1a] text-lg">{t.name}</h4>
                                    <p className="font-body text-[#999999] text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">

                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
