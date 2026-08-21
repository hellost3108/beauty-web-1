import { ArrowUpRight, Droplets, FlaskConical, Timer } from 'lucide-react';
import Link from 'next/link';

const BeautyTransformation = () => {
  return (
    <section className="overflow-hidden bg-[#191816] py-20 text-white md:py-28 xl:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-10 xl:px-14">
        <div className="lg:col-span-5 lg:pr-8">
          <div className="mb-6 flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5a6d]">
            <span className="h-px w-8 bg-current" />
            Khoa học làn da
          </div>
          <h2 className="max-w-xl font-display text-[clamp(2.75rem,5.2vw,5.75rem)] leading-[0.96] tracking-[-0.05em]">
            Làn da cần <span className="text-[#ff5a6d]">đúng hoạt chất</span>, không cần thêm áp lực.
          </h2>
          <p className="mt-7 max-w-lg font-body text-sm leading-7 text-white/60 md:text-base">
            Melalogy kết hợp nền hydrogel ôm sát da với các công thức tập trung, giúp chu trình chăm sóc trở nên rõ ràng và vừa đủ cho từng nhu cầu.
          </p>

          <div className="mt-10 grid grid-cols-3 border-y border-white/15 py-6">
            <div className="pr-3">
              <FlaskConical className="mb-3 h-4 w-4 text-[#ff5a6d]" />
              <strong className="block font-body text-xl font-semibold">04</strong>
              <span className="font-body text-[11px] text-white/45">công thức</span>
            </div>
            <div className="border-x border-white/15 px-4">
              <Timer className="mb-3 h-4 w-4 text-[#ff5a6d]" />
              <strong className="block font-body text-xl font-semibold">15–20</strong>
              <span className="font-body text-[11px] text-white/45">phút sử dụng</span>
            </div>
            <div className="pl-4">
              <Droplets className="mb-3 h-4 w-4 text-[#ff5a6d]" />
              <strong className="block font-body text-xl font-semibold">Hydrogel</strong>
              <span className="font-body text-[11px] text-white/45">nền mặt nạ</span>
            </div>
          </div>

          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#f01a33] px-6 py-3.5 font-body text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#d9152b]"
          >
            Khám phá câu chuyện Melalogy
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid min-h-[760px] grid-cols-1 gap-3 sm:min-h-[560px] sm:grid-cols-5 sm:gap-5 lg:col-span-7 lg:min-h-[680px]">
          <figure className="relative min-h-[440px] overflow-hidden rounded-[24px] bg-[#d9cec3] sm:col-span-3 sm:min-h-0">
            <img
              src="/assets/skincare-mask-application.jpg"
              alt="Người dùng ứng dụng mặt nạ hydrogel Melalogy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.02]"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-black/25 px-3 py-1.5 font-body text-[10px] font-medium uppercase tracking-[0.13em] text-white backdrop-blur-md">
              Chăm sóc tại nhà
            </figcaption>
          </figure>

          <figure className="relative min-h-[300px] overflow-hidden rounded-[24px] bg-[#eee8f3] p-2 sm:col-span-2 sm:min-h-0 sm:p-5">
            <img
              src="/assets/mask-radiance-purple.png"
              alt="Mặt nạ hydrogel Energy Shot Rạng Rỡ của Melalogy"
              className="h-full w-full object-contain transition-transform duration-1000 ease-out hover:scale-[1.025]"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 font-body text-[10px] font-semibold uppercase tracking-[0.13em] text-[#5d4773]">
              Energy Shot · Rạng Rỡ
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default BeautyTransformation;
