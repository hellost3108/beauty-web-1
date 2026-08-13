import ProductCard from './ProductCard';

const bestSellers = [
  {
    id: 5,
    image: "/assets/anh400x500 1.png",
    name: 'Silk Skin Foundation',
    description: 'Lightweight, buildable coverage with a natural finish',
    price: '$52',
  },
  {
    id: 6,
    image: "/assets/anh400x500 2.png",
    name: 'Nude Palette Collection',
    description: 'Twelve essential shades from matte to shimmer',
    price: '$48',
  },
  {
    id: 7,
    image: "/assets/anh400x500 3.png",
    name: 'Glass Skin Primer',
    description: 'Blur and smooth for a flawless, luminous base',
    price: '$42',
  },
];

const BestSellers = () => {
  return (
    <section id="bestsellers" className="py-20 md:py-28 bg-blush-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="font-body text-sm text-primary tracking-widest uppercase mb-4 block">
            Customer Favorites
          </span>
          <h2 className="font-brand text-section text-foreground">
            The Best Selling
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
