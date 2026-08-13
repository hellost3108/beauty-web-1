import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ShippingReturns = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl mb-12 text-[#1a1a1a] text-center">Shipping & Returns</h1>

                <div className="space-y-12">
                    {/* Shipping Section */}
                    <section className="space-y-4">
                        <h2 className="font-display text-2xl text-[#1a1a1a] border-b border-gray-200 pb-2">Shipping Policy</h2>
                        <div className="space-y-4 text-[#666666] font-body">
                            <p>
                                <strong>Processing Time:</strong> All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
                            </p>
                            <p>
                                <strong>Shipping Rates:</strong> We offer a flat rate shipping fee of Rs. 100 on all orders below Rs. 999. Orders above Rs. 999 qualify for free standard shipping.
                            </p>
                            <p>
                                <strong>Delivery Estimates:</strong> Standard shipping typically takes 3-5 business days depending on your location. Expedited shipping options are available at checkout.
                            </p>
                        </div>
                    </section>

                    {/* Returns Section */}
                    <section className="space-y-4">
                        <h2 className="font-display text-2xl text-[#1a1a1a] border-b border-gray-200 pb-2">Return & Refund Policy</h2>
                        <div className="space-y-4 text-[#666666] font-body">
                            <p>
                                We want you to be completely satisfied with your purchase. If you are not unhappy with your order, we are here to help.
                            </p>
                            <p>
                                <strong>Returns:</strong> You have 30 days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.
                            </p>
                            <p>
                                <strong>Refunds:</strong> Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).
                            </p>
                            <p>
                                <strong>Shipping Costs:</strong> You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ShippingReturns;
