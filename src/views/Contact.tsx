"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent successfully!");
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <h1 className="font-display text-4xl mb-8 text-[#1a1a1a] text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="font-display text-2xl text-[#1a1a1a]">Get in Touch</h2>
                        <p className="font-body text-[#666666] leading-relaxed">
                            Have questions about our products or your order? We're here to help!
                            Fill out the form or reach out to us using the contact details below.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Address</h3>
                                <p className="text-[#666666]">Mumbai, MH, India</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Email</h3>
                                <p className="text-[#666666]">johndoe@example.com</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Phone</h3>
                                <p className="text-[#666666]">+ 1234567890</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Hours</h3>
                                <p className="text-[#666666]">09:00 am - 05:00 pm</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#f9f8f7] p-8 rounded-[20px]">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Name</label>
                                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f01a33]" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Email</label>
                                <input required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f01a33]" placeholder="Your email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Message</label>
                                <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f01a33]" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#f01a33] text-white py-3 rounded-lg font-semibold hover:bg-[#d63a63] transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;

