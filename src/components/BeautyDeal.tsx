import { Leaf, FlaskConical, HeartHandshake, Truck } from 'lucide-react';

const usps = [
    {
        icon: FlaskConical,
        title: 'Công Thức Khoa Học',
        description: 'Thành phần hoạt tính được nghiên cứu chuyên sâu cho từng nhu cầu da',
    },
    {
        icon: Leaf,
        title: 'Thành Phần Lành Tính',
        description: 'Không paraben, không sulfate, an toàn cho làn da nhạy cảm',
    },
    {
        icon: HeartHandshake,
        title: 'Không Thử Nghiệm Trên Động Vật',
        description: 'Cam kết nhân đạo trong toàn bộ quy trình sản xuất',
    },
    {
        icon: Truck,
        title: 'Giao Hàng Toàn Quốc',
        description: 'Đóng gói cẩn thận, giao nhanh đến tận tay bạn',
    },
];

const BeautyDeal = () => {
    return (
        <section className="bg-[#fcfaf9] py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-4">
                        Vì Sao Chọn <span className="text-[#f01a33]">Melalogy</span>
                    </h2>
                    <p className="font-body text-[#666666] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Khoa học của Melanin — chăm sóc làn da bằng những gì da bạn thực sự cần.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    {usps.map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full border border-[#f01a33]/30 bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#fff5f6] transition-colors duration-300">
                                <item.icon className="w-7 h-7 text-[#f01a33]" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display text-sm md:text-base text-[#1a1a1a] mb-2">
                                {item.title}
                            </h3>
                            <p className="font-body text-xs md:text-sm text-[#888888] leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeautyDeal;
