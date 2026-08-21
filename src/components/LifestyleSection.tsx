import { Instagram, Facebook, Link2 } from 'lucide-react';

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
          <span className="font-body text-sm text-[#f01a33] tracking-widest uppercase mb-4 block">
            @Blushora
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a] leading-[1.1] tracking-[-0.018em]">
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-[#f01a33] transition-colors duration-200">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-[#f01a33] transition-colors duration-200">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-[#f01a33] transition-colors duration-200">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-[#f01a33] transition-colors duration-200">
                  <Link2 className="w-5 h-5 text-white" />
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
