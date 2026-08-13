import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-rose-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#f01a33] to-[#e91e63] text-white pt-32 pb-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-white/90 font-body text-lg">
                            Last updated: December 29, 2025
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                1. Agreement to Terms
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                By accessing and using Blushora's website and services, you accept and agree to be bound by the
                                terms and provision of this agreement. If you do not agree to abide by the above, please do not
                                use this service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                2. Use License
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Permission is granted to temporarily access the materials (information or software) on Blushora's
                                website for personal, non-commercial transitory viewing only. This is the grant of a license, not
                                a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or public display</li>
                                <li>Attempt to decompile or reverse engineer any software on Blushora's website</li>
                                <li>Remove any copyright or proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                3. Product Information and Pricing
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                We strive to provide accurate product descriptions and pricing. However, we do not warrant that
                                product descriptions, pricing, or other content is accurate, complete, reliable, current, or
                                error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change
                                or update information at any time without prior notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                4. Orders and Payment
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                By placing an order, you warrant that:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>You are legally capable of entering into binding contracts</li>
                                <li>You are at least 18 years of age</li>
                                <li>All information you provide is accurate and complete</li>
                                <li>You have the authority to use the payment method provided</li>
                            </ul>
                            <p className="text-gray-700 font-body leading-relaxed mt-3">
                                We reserve the right to refuse or cancel any order for any reason, including limitations on
                                quantities available for purchase, inaccuracies in product or pricing information, or problems
                                identified by our fraud detection systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                5. Shipping and Delivery
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                We will make every effort to deliver products within the estimated timeframes. However, delays
                                may occasionally occur. We are not liable for any delays in shipments. Title and risk of loss
                                pass to you upon our delivery to the carrier.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                6. Returns and Refunds
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                We want you to be completely satisfied with your purchase. If you're not happy with your order,
                                you may return unopened products within 30 days of delivery for a full refund. Opened beauty
                                products cannot be returned due to health and safety regulations. Please refer to our Returns
                                Policy for complete details.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                7. User Accounts
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                When you create an account with us, you must provide accurate, complete, and current information.
                                You are responsible for safeguarding your password and for all activities that occur under your
                                account. You agree to notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                8. Intellectual Property
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                The service and its original content, features, and functionality are and will remain the exclusive
                                property of Blushora and its licensors. The service is protected by copyright, trademark, and other
                                laws. Our trademarks may not be used in connection with any product or service without our prior
                                written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                9. Limitation of Liability
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                In no event shall Blushora, nor its directors, employees, partners, agents, suppliers, or affiliates,
                                be liable for any indirect, incidental, special, consequential, or punitive damages, including without
                                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your
                                access to or use of or inability to access or use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                10. Governing Law
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which
                                Blushora operates, without regard to its conflict of law provisions. Our failure to enforce any right
                                or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                11. Changes to Terms
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                                provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
                                change will be determined at our sole discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                12. Contact Information
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                                <p className="text-gray-700 font-body">
                                    <strong>Email:</strong> legal@blushora.com<br />
                                    <strong>Phone:</strong> +1 (555) 123-4567<br />
                                    <strong>Address:</strong> 123 Beauty Lane, Glow City, GC 12345
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;
