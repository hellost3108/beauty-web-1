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
                    {/* Placeholder image for hero - using hero-model.jpg for now */}
                    <img
                        src="/assets/placeholder-1200x600.png"
                        alt="Blushora Models"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="w-full max-w-none mx-auto px-6 text-center py-8 md:py-12">
                    <h1 className="font-display text-3xl md:text-4xl mb-4">Blushora</h1>
                    <p className="font-body text-[#666666] text-sm md:text-base leading-relaxed tracking-wide ">
                        At Blushora, we unite homegrown purity with world-class science, creating beauty that is both authentic and advanced.
                    </p>
                </div>
            </section>

            {/* Ethical Roots Section */}
            <section className="py-4 md:py-6 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="relative rounded-[30px] overflow-hidden h-[400px] md:h-[600px] group">
                            <img
                                src="/assets/placeholder-600x400.png"
                                alt="Natural Ingredients"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="w-16 h-16 rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6 shadow-sm">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl">
                                Ethical <span className="text-[#e7406e]">Roots</span>
                            </h2>
                            <p className="font-body text-[#666666] leading-relaxed text-lg">
                                At Blushora, our ethical roots guide every choice we make — from responsbily sourced ingredients and cruelty-free practices to clean formulations, sustainability, and complete transparency.
                            </p>
                            <ul className="space-y-4 font-body text-[#4a4a4a]">
                                {[
                                    "Responsibly and ethically sourced ingredients",
                                    "Cruelty-free beauty, always",
                                    "Clean, safe, and conscious formulations",
                                    "Sustainable and eco-friendly practices",
                                    "Honest transparency and global quality standards"
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
                                Global <span className="text-[#e7406e]">Science</span>
                            </h2>
                            <p className="font-body text-[#666666] leading-relaxed text-lg">
                                At Blushora, global science shapes every formula - combining advanced research, clinically inspired methods, and internationally recognized standards to deliver proven, high-performance beauty.
                            </p>
                            <ul className="space-y-4 font-body text-[#4a4a4a]">
                                {[
                                    "Scientifically researched and expert-developed formulations",
                                    "Dermatologically tested for safety and efficacy",
                                    "Powered by globally trusted ingredients and actives",
                                    "Developed using advanced cosmetic science and innovation",
                                    "Meets international quality, safety, and performance standards"
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
                                src="/assets/placeholder-600x400.png"
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
                            <h4 className="font-display text-xl mb-3">Natural Ingredient</h4>
                            <p className="text-sm text-[#888888] font-body">Source ethically from their native origins.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#fcfcfc] p-10 rounded-[20px] text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6">
                                <PawPrint className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2">0%</h3>
                            <h4 className="font-display text-xl mb-3">Animal Cruelty</h4>
                            <p className="text-sm text-[#888888] font-body">Sourced ethically from their native origins.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#fcfcfc] p-10 rounded-[20px] text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#ffeeee] flex items-center justify-center text-[#e7406e] mb-6">
                                <Microscope className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2">100%</h3>
                            <h4 className="font-display text-xl mb-3">Lab Formulations</h4>
                            <p className="text-sm text-[#888888] font-body">Rigorously tested for safety and efficacy.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline Section */}
            <section className="py-12 md:py-16 bg-[#fcfcfc]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="font-body text-3xl md:text-4xl mb-2">
                        Our <span className="text-[#e7406e]">Journey</span>
                    </h2>
                    <p className="text-[#888888] mb-8">Rigorously tested for safety and efficacy.</p>

                    <div className="relative max-w-7xl mx-auto py-6">
                        {/* Horizontal Connecting Line - Desktop */}
                        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#e7406e] hidden md:block -translate-y-1/2 z-0"></div>

                        {/* Vertical Connecting Line - Mobile */}
                        <div className="absolute top-6 bottom-6 left-[19px] w-[3px] bg-[#e7406e] md:hidden z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                            {/* Point 1 - Inception */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="md:absolute md:bottom-1/2 w-full flex flex-col md:items-center pb-0 md:pb-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Inception</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Founded two friends looking for clean skincare solutions.</p>
                                </div>
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                            </div>

                            {/* Point 2 - First Patent */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                                <div className="md:absolute md:top-1/2 w-full flex flex-col md:items-center pt-0 md:pt-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">First Patent</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Patent our unique Turmeric-C complex extraction method.</p>
                                </div>
                            </div>

                            {/* Point 3 - Global Launch */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="md:absolute md:bottom-1/2 w-full flex flex-col md:items-center pb-0 md:pb-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Global Launch</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Founded two sisters looking for clean skincare solutions.</p>
                                </div>
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                            </div>

                            {/* Point 4 - Sustainability Award */}
                            <div className="relative h-auto md:h-[240px] flex md:justify-center pl-12 md:pl-0 text-left md:text-center">
                                <div className="absolute top-2 md:top-1/2 left-[14px] md:left-1/2 w-3 h-3 rounded-full bg-[#e7406e] ring-4 ring-[#fcfcfc] md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>
                                <div className="md:absolute md:top-1/2 w-full flex flex-col md:items-center pt-0 md:pt-8 px-2">
                                    <h3 className="font-display text-xl font-bold mb-1 md:mb-2">Sustainability Award</h3>
                                    <p className="text-sm md:text-xs text-[#666666] md:max-w-[180px]">Recognized for our zero-waste packaging initiatives.</p>
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
                                <img src="/assets/placeholder-400x500.png" alt="Kanak Sharma" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="font-display text-3xl mb-2">Kanak Sharma</h3>
                            <p className="text-[#e7406e] font-display text-lg tracking-wide uppercase mb-4">Co-Founder & Product Head</p>
                            <p className="text-[#666666] font-body italic text-sm">
                                "I wanted to create products that my grandmother would recognize, but my dermatologist would approve."
                            </p>
                        </div>

                        {/* Founder 2 - Aly D'Suza */}
                        <div className="group text-center max-w-sm mx-auto">
                            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden mb-8 border-4 border-white relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                <img src="/assets/placeholder-400x500.png" alt="Aly D'Suza" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="font-display text-3xl mb-2">Aly D'Suza</h3>
                            <p className="text-[#e7406e] font-display text-lg tracking-wide uppercase mb-4">Co-Founder & CEO</p>
                            <p className="text-[#666666] font-body italic text-sm">
                                "Blushora isn't just a brand; it's a bridge between cultures, generations, and scientific advancements."
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
                            <h2 className="font-display text-3xl md:text-4xl mb-2">@Blushora</h2>
                            <p className="text-[#666666]">Join our community of clean beauty enthusiasts.</p>
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
                                // Set 1
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                // Set 2
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                // Set 3
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                // Set 4
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
                                "/assets/placeholder-300x400.png",
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
