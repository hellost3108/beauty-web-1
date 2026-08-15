import { Leaf, FlaskConical, PawPrint, Microscope } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Navbar />

            {/* Hero Section */}
            <section className="w-full pt-[72px]">
                <div className="w-full h-[35vh] landscape:h-[85vh] lg:h-screen lg:landscape:h-screen bg-gray-100 overflow-hidden relative">
                    {/* Hero banner image */}
                    <img
                        src="/assets/li.jpg"
                        alt="Blushora Models"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="w-full max-w-none mx-auto px-6 text-center py-8 md:py-12">
                    <h1 className="font-display text-3xl md:text-4xl mb-4">MELALOGY</h1>
                    <p className="font-body text-[#666666] text-sm md:text-base leading-relaxed tracking-wide ">
                    Thương hiệu mỹ phẩm hàng đầu đến từ HCM        </p>
                </div>
            </section>

            {/* Ethical Roots Section */}
            <section className="py-4 md:py-6 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="relative rounded-[30px] overflow-hidden h-[400px] md:h-[600px] group">
                            <img
                                src="/assets/lg.png"
                                alt="Natural Ingredients"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="w-16 h-16 rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6 shadow-sm">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl">
                                MELALOGY <span className="text-[#e7406e]">The Science of Melanin </span>
                            </h2>
                            <p className="font-body text-[#666666] leading-relaxed text-lg">
                                Chúng tôi tin rằng vẻ đẹp thực sự bắt nguồn từ sự minh bạch, trách nhiệm và sự tôn trọng dành cho con người cũng như hành tinh. Với triết lý Ethical Roots, MELALOGY cam kết mang đến những sản phẩm mỹ phẩm vừa hiệu quả vừa nhân văn.
                            </p>
                            <ul className="space-y-4 font-body text-[#4a4a4a]">
                                {[
                                    "Nguyên liệu bền vững: Được chọn lọc và khai thác một cách có trách nhiệm",
                                    "Cruelty-free: Không thử nghiệm trên động vật, luôn tôn trọng sự sống.",
                                    "Công thức sạch: An toàn, lành tính và ý thức với sức khỏe người dùng",
                                    "Thực hành xanh: Hướng đến phát triển bền vững và thân thiện môi trường.",
                                    "Minh bạch: Cam kết chất lượng toàn cầu và sự tin tưởng tuyệt đối."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#e7406e] mt-2.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Science Section */}
            <section className="py-4 md:py-6 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="space-y-8 order-2 md:order-1">
                            <div className="w-16 h-16 rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6 shadow-sm">
                                <FlaskConical className="w-8 h-8" />
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl">
                                Khoa học  <span className="text-[#e7406e]">toàn cầu</span>
                            </h2>
                            <p className="font-body text-[#666666] leading-relaxed text-lg">
                                Tại MELALOGY, khoa học toàn cầu là nền tảng cho mọi công thức làm đẹp. Chúng tôi kết hợp nghiên cứu tiên tiến, phương pháp lâm sàng và tiêu chuẩn quốc tế để mang đến những sản phẩm hiệu quả, an toàn và đáng tin cậy.
                            </p>
                            <ul className="space-y-4 font-body text-[#4a4a4a]">
                                {[
                                    "Công thức nghiên cứu khoa học: Được phát triển bởi các chuyên gia hàng đầu.",
                                    "Kiểm nghiệm da liễu: Đảm bảo an toàn và hiệu quả cho mọi loại da.",
                                    "Powered by globally trusted ingredients and actives",
                                    "Thành phần toàn cầu: Sử dụng nguyên liệu và hoạt chất được tin tưởng trên thế giới",
                                    "Công nghệ tiên tiến: Ứng dụng khoa học hiện đại trong phát triển sản phẩm."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#e7406e] mt-2.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative rounded-[30px] overflow-hidden h-[400px] md:h-[600px] order-1 md:order-2 group">
                            <img
                                src="/assets/ngot.jpeg"
                                alt="Lab Science"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Cards Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#fcfcfc] p-10 rounded-[20px] text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2">100%</h3>
                            <h4 className="font-display text-xl mb-3">100% thành phần tự nhiên</h4>
                            <p className="text-sm text-[#888888] font-body">Khai thác có trách nhiệm từ nguồn gốc bản địa.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#fcfcfc] p-10 rounded-[20px] text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6">
                                <PawPrint className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2">0%</h3>
                            <h4 className="font-display text-xl mb-3">0% thử nghiệm động vật</h4>
                            <p className="text-sm text-[#888888] font-body">Luôn tôn trọng sự sống, không gây tổn hại</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#fcfcfc] p-10 rounded-[20px] text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6">
                                <Microscope className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2">100%</h3>
                            <h4 className="font-display text-xl mb-3">công thức phòng thí nghiệm</h4>
                            <p className="text-sm text-[#888888] font-body"> Được kiểm nghiệm nghiêm ngặt về độ an toàn và hiệu quả.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline Section */}
            <section className="py-12 md:py-16 bg-[#fcfcfc]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="font-body text-3xl md:text-4xl mb-2">
                        Hành trình <span className="text-[#e7406e]">của chúng tôi</span>
                    </h2>
                    <p className="text-[#888888] mb-8">Mỗi bước đi của MELALOGY đều gắn liền với sự đổi mới và cam kết bền vững.</p>

                    <div className="relative max-w-7xl mx-auto py-6">
                        {/* Horizontal Connecting Line - Desktop */}
                        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#e7406e] hidden md:block -translate-y-1/2 z-0"></div>

                        {/* Vertical Connecting Line - Mobile */}
                        <div className="absolute top-6 bottom-6 left-[19px] w-[3px] bg-[#e7406e] md:hidden z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                            {/* Point 1 - Inception */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="md:absolute md:bottom-1/2 w-full flex flex-col md:items-center pb-0 md:pb-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Khởi nguồn</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Hai người bạn cùng chung khát vọng tìm kiếm giải pháp chăm sóc da sạch.</p>
                                </div>
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                            </div>

                            {/* Point 2 - First Patent */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                                <div className="md:absolute md:top-1/2 w-full flex flex-col md:items-center pt-0 md:pt-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Bằng sáng chế đầu tiên </h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Phát triển phương pháp chiết xuất độc quyền.</p>
                                </div>
                            </div>

                            {/* Point 3 - Global Launch */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="md:absolute md:bottom-1/2 w-full flex flex-col md:items-center pb-0 md:pb-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Ra mắt toàn cầu</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Đưa sản phẩm đến với cộng đồng quốc tế, khẳng định vị thế thương hiệu.</p>
                                </div>
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                            </div>

                            {/* Point 4 - Sustainability Award */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                                <div className="md:absolute md:top-1/2 w-full flex flex-col md:items-center pt-0 md:pt-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Giải thưởng bền vững</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Được công nhận nhờ sáng kiến bao bì không rác thải.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="font-display text-3xl md:text-4xl mb-16">
                        Meet The <span className="text-[#e7406e]">Founders</span>
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 relative z-10">
                        {/* Founder 1 - Kanak Sharma */}
                        <div className="group text-center max-w-sm mx-auto">
                            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden mb-8 border-4 border-white relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                <img src="/assets/linh.jpg" alt="Kanak Sharma" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="font-display text-3xl mb-2">Jungkook</h3>
                            <p className="text-[#e7406e] font-display text-lg tracking-wide uppercase mb-4">KOC</p>
                            <p className="text-[#666666] font-body italic text-sm">
                                "Tôi Thấy sản phẩm thật tuyệt vời"
                            </p>
                        </div>

                        {/* Founder 2 - Aly D'Suza */}
                        <div className="group text-center max-w-sm mx-auto">
                            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden mb-8 border-4 border-white relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                <img src="/assets/rose.jpg" alt="Aly D'Suza" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="font-display text-3xl mb-2">Rose</h3>
                            <p className="text-[#e7406e] font-display text-lg tracking-wide uppercase mb-4">KOL</p>
                            <p className="text-[#666666] font-body italic text-sm">
                                "Quá tuyệt vời."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instagram Section */}
            <section className="py-16 md:py-24 bg-[#fdf2f8]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="text-left">
                            <h2 className="font-display text-3xl md:text-4xl mb-2">MELALOGY</h2>
                            <p className="text-[#666666]">BEAUTY VIỆT NAM</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#e7406e] font-display text-lg hover:opacity-80 transition-opacity mt-4 md:mt-0 cursor-pointer">
                            Follow Us
                        </div>
                    </div>

                    {/* Marquee Carousel */}
                    <div className="w-full overflow-hidden relative">
                        <style>{`
                            @keyframes marquee {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-25%); }
                            }
                            .animate-marquee {
                                animation: marquee 20s linear infinite;
                            }
                            .animate-marquee:hover {
                                animation-play-state: paused;
                            }
                        `}</style>
                        <div className="flex w-max animate-marquee gap-4 md:gap-6 hover:pause">
                            {[
                                // Set 1
                                "/assets/1.jpg",
                                "/assets/2.jpg",
                                "/assets/3.jpg",
                                "/assets/5.jpg",
                                "/assets/tangjiao990-watercolor-1020509_1920.jpg",
                                // Set 2
                                "/assets/1.jpg",
                                "/assets/2.jpg",
                                "/assets/3.jpg",
                                "/assets/5.jpg",
                                "/assets/tangjiao990-watercolor-1020509_1920.jpg",
                                // Set 3
                                "/assets/1.jpg",
                                "/assets/2.jpg",
                                "/assets/3.jpg",
                                "/assets/5.jpg",
                                "/assets/tangjiao990-watercolor-1020509_1920.jpg",
                                // Set 4
                                "/assets/1.jpg",
                                "/assets/2.jpg",
                                "/assets/3.jpg",
                                "/assets/5.jpg",
                                "/assets/placeholder.svg"
                            ].map((img, i) => (
                                <div key={i} className="w-[280px] md:w-[320px] aspect-[4/3] relative rounded-[20px] overflow-hidden flex-shrink-0 group cursor-pointer shadow-sm">
                                    <img src={img} alt={`Blushora Community ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
