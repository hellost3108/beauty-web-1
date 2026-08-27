import { Instagram, Facebook } from 'lucide-react';

const lifestyleImages = [
  { src: '/assets/placeholder-400x400.png', alt: 'Luxury cosmetics arranged on marble surface' },
  { src: '/assets/placeholder-400x400.png', alt: 'Golden hour beauty products photography' },
  { src: '/assets/placeholder-400x400.png', alt: 'Natural skincare products with botanical elements' },
  { src: '/assets/placeholder-400x400.png', alt: 'Minimalist makeup flatlay with warm tones' },
];

const LifestyleSection = () => {
  return (
    <section className="py-8 md:py-12 bg-blush-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="font-body text-sm text-[#b31324] tracking-widest uppercase mb-4 block">
            @Blushora
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#111111] leading-[1.1] tracking-[-0.018em]">
            Join Our Beauty Community
          </h2>
        </div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {lifestyleImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Social Media Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10 backdrop-blur-[2px]">
                <a href="https://www.instagram.com/melalogyvietnam/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Melalogy" className="bg-white/20 p-2 rounded-full hover:bg-[#b31324] transition-colors duration-200">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="https://zalo.me/0702899707" target="_blank" rel="noopener noreferrer" aria-label="Zalo Melalogy" className="bg-white/20 p-2 rounded-full hover:bg-[#b31324] transition-colors duration-200">
                  <span aria-hidden="true" className="grid w-5 h-5 place-items-center text-xs font-bold leading-none text-white">Z</span>
                </a>
                <a href="https://www.facebook.com/melalogyvietnam/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Melalogy" className="bg-white/20 p-2 rounded-full hover:bg-[#b31324] transition-colors duration-200">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.tiktok.com/@melalogy.vietnam" target="_blank" rel="noopener noreferrer" aria-label="TikTok Melalogy" className="bg-white/20 p-2 rounded-full hover:bg-[#b31324] transition-colors duration-200">
                  <span aria-hidden="true" className="grid w-5 h-5 place-items-center text-lg leading-none text-white">♪</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
