import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    image: "/assets/placeholder-400x500.png",
    name: 'Velvet Rose Lipstick',
    description: 'Long-lasting matte formula with hydrating rose extract',
    price: '$38',
  },
  {
    id: 2,
    image: "/assets/placeholder-400x500.png",
    name: 'Radiance Glow Serum',
    description: 'Vitamin C enriched serum for luminous, even-toned skin',
    price: '$65',
  },
  {
    id: 3,
    image: "/assets/placeholder-400x500.png",
    name: 'Soft Petal Blush',
    description: 'Buildable powder blush with natural flush finish',
    price: '$32',
  },
  {
    id: 4,
    image: "/assets/placeholder-400x500.png",
    name: 'Lash Definition Mascara',
    description: 'Volumizing and lengthening with clean ingredients',
    price: '$28',
  },
];

const ProductGrid = () => {
  return (
    <section id="shop" className="py-20 md:py-28 bg-blush-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-brand text-section text-foreground mb-4">
            Curated Essentials
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Discover our carefully selected collection of luxury beauty products, 
            crafted with the finest ingredients.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <button className="font-button text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
