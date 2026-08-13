import { Leaf, Shield, Heart, Truck } from 'lucide-react';

const trustItems = [
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description: 'Free from parabens, sulfates, and harmful chemicals',
  },
  {
    icon: Shield,
    title: 'Dermatologically Tested',
    description: 'Approved by dermatologists for all skin types',
  },
  {
    icon: Heart,
    title: 'Cruelty Free',
    description: 'Never tested on animals, certified vegan friendly',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Free express delivery on orders over $50',
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4 shadow-soft group-hover:shadow-card transition-shadow duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-brand text-base md:text-lg text-foreground mb-2">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
