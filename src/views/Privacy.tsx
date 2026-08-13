import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-rose-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#f01a33] to-[#e91e63] text-white pt-32 pb-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            Privacy Policy
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
                                1. Introduction
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Welcome to Blushora. We respect your privacy and are committed to protecting your personal data.
                                This privacy policy will inform you about how we look after your personal data when you visit our
                                website and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                2. Information We Collect
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                We may collect, use, store and transfer different kinds of personal data about you:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li><strong>Identity Data:</strong> First name, last name, username or similar identifier</li>
                                <li><strong>Contact Data:</strong> Email address, telephone numbers, billing and delivery addresses</li>
                                <li><strong>Financial Data:</strong> Payment card details</li>
                                <li><strong>Transaction Data:</strong> Details about payments and products you have purchased from us</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, time zone setting, and location</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website and products</li>
                                <li><strong>Marketing Data:</strong> Your preferences in receiving marketing from us</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                3. How We Use Your Information
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                We will only use your personal data when the law allows us to. Most commonly, we will use your
                                personal data in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>To process and deliver your orders</li>
                                <li>To manage your account and provide customer support</li>
                                <li>To send you marketing communications (with your consent)</li>
                                <li>To improve our website, products, and services</li>
                                <li>To protect against fraud and ensure security</li>
                                <li>To comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                4. Data Security
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                We have put in place appropriate security measures to prevent your personal data from being
                                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal
                                data to those employees, agents, contractors, and other third parties who have a business need
                                to know. They will only process your personal data on our instructions and are subject to a
                                duty of confidentiality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                5. Cookies
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Our website uses cookies to distinguish you from other users. This helps us to provide you with
                                a good experience when you browse our website and also allows us to improve our site. You can
                                set your browser to refuse all or some browser cookies, or to alert you when websites set or
                                access cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                6. Your Rights
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Under certain circumstances, you have rights under data protection laws in relation to your
                                personal data:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>Request access to your personal data</li>
                                <li>Request correction of your personal data</li>
                                <li>Request erasure of your personal data</li>
                                <li>Object to processing of your personal data</li>
                                <li>Request restriction of processing your personal data</li>
                                <li>Request transfer of your personal data</li>
                                <li>Right to withdraw consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                7. Third-Party Links
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Our website may include links to third-party websites, plug-ins, and applications. Clicking on
                                those links or enabling those connections may allow third parties to collect or share data about
                                you. We do not control these third-party websites and are not responsible for their privacy
                                statements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                8. Contact Us
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                                <p className="text-gray-700 font-body">
                                    <strong>Email:</strong> privacy@blushora.com<br />
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

export default Privacy;
