import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Account = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 text-center">
                <h1 className="font-display text-4xl mb-4 text-[#1a1a1a]">My Account</h1>
                <p className="font-body text-[#666666]">Sign in to view your details.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Account;
