const ToolsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-blush-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-elevated">
            <img
              src="/assets/placeholder-600x600.png"
              alt="Luxury makeup brushes and tools arranged aesthetically"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="font-body text-sm text-primary tracking-widest uppercase mb-4 block">
              Professional Tools
            </span>
            <h2 className="font-brand text-section text-foreground mb-6">
              The Artist's Collection
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Every masterpiece begins with the right tools. Our professional-grade 
              brushes and applicators are designed for precision and durability, 
              crafted with ethically sourced materials that feel as good as they perform.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Cruelty-free synthetic bristles',
                'Ergonomic handles for precision',
                'Vegan & sustainable materials',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-body text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <button className="font-button text-sm text-foreground border-b-2 border-primary pb-1 hover:text-primary transition-colors">
              Shop Tools & Brushes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
