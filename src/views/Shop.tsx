import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopSection from '@/components/ShopSection';
import type { StorefrontProduct } from '@/types/cms';

const Shop = ({ products }: { products?: StorefrontProduct[] }) => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-[72px]">
                <ShopSection initialProducts={products} />
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
