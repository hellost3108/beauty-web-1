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
        <section className="bg-[#f5f0ec] px-4 py-20 md:px-6 md:py-28">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-14 grid items-end gap-6 md:grid-cols-2 md:mb-16">
                    <h2 data-reveal="left" className="font-display text-5xl md:text-7xl text-[#1a1a1a] leading-[1.07] tracking-[-0.022em]">
                        Vì Sao Chọn <span className="text-[#f01a33]">Melalogy</span>
                    </h2>
                    <p data-reveal="right" data-reveal-delay="110" className="font-body text-[#666666] text-sm md:text-base max-w-xl md:ml-auto leading-relaxed">
                        Mỗi trạng thái da có một tín hiệu riêng. Melalogy giúp bạn nhận ra và chọn đúng công thức cần thiết.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {usps.map((item, index) => (
                        <div
                            key={item.title}
                            data-reveal="scale"
                            data-reveal-delay={String(index * 90)}
                            className="group min-h-[260px] rounded-[28px] border border-black/10 bg-white/70 p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:bg-[#181515] hover:text-white hover:shadow-2xl"
                        >
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-bold tracking-[0.2em] text-black/35 group-hover:text-white/35">0{index + 1}</span>
                                <div className="w-14 h-14 rounded-full border border-[#f01a33]/25 bg-[#fff5f6] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#f01a33] group-hover:border-[#f01a33]">
                                    <item.icon className="w-7 h-7 text-[#f01a33] group-hover:text-white" strokeWidth={1.5} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl text-[#1a1a1a] mb-3 leading-tight group-hover:text-white">{item.title}</h3>
                                <p className="font-body text-sm text-[#777] leading-relaxed group-hover:text-white/60">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeautyDeal;
