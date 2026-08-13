import { Button } from '@/components/ui/button';

const PromoCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-blush-medium">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span className="font-body text-sm text-primary tracking-widest uppercase mb-4 block">
          Exclusive Offer
        </span>
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
          Get <span className="text-primary">20% Off</span> Your First Order
        </h2>
        <p className="font-body text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
          Join the Blushora community and receive exclusive access to new launches, 
          beauty tips, and member-only offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 h-14 px-6 rounded-xl bg-card border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <Button variant="hero" size="lg" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </div>
        <p className="font-body text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default PromoCTA;
