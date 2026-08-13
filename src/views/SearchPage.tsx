import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SearchPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 text-center">
                <h1 className="font-display text-4xl mb-4 text-[#1a1a1a]">Search</h1>
                <div className="max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f01a33]"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
