import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopSection from '@/components/ShopSection';

const Shop = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-[72px]">
                <ShopSection />
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
