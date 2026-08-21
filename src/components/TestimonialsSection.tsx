import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Minh Anh',
        role: 'Khách hàng tại TP. Hồ Chí Minh',
        quote: 'Miếng mặt nạ ôm sát và không bị trượt khi đắp. Sau khi dùng, da mình có cảm giác dịu, mềm và đủ ẩm hơn.',
        stars: 5,
        initials: 'MA',
        avatarTone: '#f7d9d9',
    },
    {
        name: 'Ngọc Hà',
        role: 'Khách hàng tại Hà Nội',
        quote: 'Mình thích cách Melalogy chia công thức theo từng nhu cầu. Bao bì dễ nhận biết, cách dùng gọn và hợp với những hôm bận rộn.',
        stars: 5,
        initials: 'NH',
        avatarTone: '#e8e1f3',
    },
    {
        name: 'Thùy Dương',
        role: 'Khách hàng tại Đà Nẵng',
        quote: 'Chất hydrogel mát và dễ chịu. Mình có thể chọn đúng loại da đang cần mà không phải thêm quá nhiều bước vào chu trình.',
        stars: 5,
        initials: 'TD',
        avatarTone: '#dfeee8',
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-[#fff8f9]">
            <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32">
                {/* Section Title */}
                <div data-reveal="up" className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-[-0.018em]">
                        <span className="text-[#1a1a1a]">Cảm Nhận Từ </span>
                        <span className="text-[#f01a33]">Khách Hàng Việt</span>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-16">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            data-reveal="scale"
                            data-reveal-delay={String(i * 120)}
                            className={`bg-white p-8 md:p-10 rounded-[20px] shadow-sm flex flex-col justify-between h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                        >
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
                                <div
                                    aria-hidden="true"
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white font-body text-xs font-semibold tracking-[0.08em] text-[#1a1a1a] shadow-sm"
                                    style={{ backgroundColor: t.avatarTone }}
                                >
                                    {t.initials}
                                </div>
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
