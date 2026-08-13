import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl mb-8 text-[#1a1a1a] text-center">Frequently Asked Questions</h1>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Are your products vegan/cruelty-free?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Yes! All Blushora products are 100% vegan and cruelty-free. We believe in beauty without harm.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">How can I track my order?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Once your order ships, you will receive a confirmation email with a tracking number. You can use this to track your package on our website.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">What is your return policy?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            We offer a 30-day return policy for unused products in their original packaging. Please visit our Shipping & Returns page for more details.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Do you ship internationally?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Currently, we ship within India. We are working on expanding our shipping to international locations soon!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Are your products suitable for sensitive skin?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Our products are formulated to be gentle and suitable for most skin types, including sensitive skin. However, we always recommend doing a patch test before full use.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
