const EditorialSection = () => {
  return (
    <section id="collections" className="py-20 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* First editorial block - Image left, text right */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-20 md:mb-32">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <img
              src="/assets/placeholder-500x700.png"
              alt="Close-up of luxury lipstick texture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-body text-sm text-primary tracking-widest uppercase mb-4">
              The Art of Color
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              Lips That <span className="text-primary">Speak Volumes</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Our lipstick collection features rich, buildable pigments infused with 
              nourishing botanicals. Each shade is designed to complement every skin tone, 
              delivering lasting color with a luxurious feel.
            </p>
            <button className="self-start font-button text-sm text-foreground border-b-2 border-primary pb-1 hover:text-primary transition-colors">
              Explore Lip Collection
            </button>
          </div>
        </div>

        {/* Second editorial block - Text left, image right */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <span className="font-body text-sm text-primary tracking-widest uppercase mb-4">
              Skin Rituals
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              Reveal Your <span className="text-primary">Natural Radiance</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Transform your skincare routine with our clean, science-backed formulations. 
              Each product is crafted to enhance your skin's natural glow while providing 
              deep hydration and protection.
            </p>
            <button className="self-start font-button text-sm text-foreground border-b-2 border-primary pb-1 hover:text-primary transition-colors">
              Discover Skincare
            </button>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-1 md:order-2">
            <img
              src="/assets/placeholder-500x700.png"
              alt="Woman with glowing, natural makeup look"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
