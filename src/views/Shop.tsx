import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopBrand2026 from '@/components/ShopBrand2026';

const Shop = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-[72px]">
                <ShopBrand2026 />
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
