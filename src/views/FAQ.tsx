import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl mb-8 text-[#1a1a1a] text-center">Câu Hỏi Thường Gặp</h1>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Sản phẩm của Melalogy có thuần chay, không thử nghiệm trên động vật không?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Có! Toàn bộ sản phẩm Melalogy đều thuần chay và không thử nghiệm trên động vật. Chúng tôi tin vào vẻ đẹp không gây tổn hại.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Làm sao để theo dõi đơn hàng của tôi?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Sau khi đơn hàng được giao cho đơn vị vận chuyển, bạn sẽ nhận được email xác nhận kèm mã vận đơn để theo dõi hành trình đơn hàng.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Chính sách đổi trả như thế nào?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày đối với sản phẩm chưa sử dụng và còn nguyên bao bì. Xem thêm chi tiết tại trang Vận Chuyển & Đổi Trả.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Melalogy có giao hàng quốc tế không?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Hiện tại chúng tôi giao hàng toàn quốc trên khắp Việt Nam. Chúng tôi đang nỗ lực mở rộng giao hàng quốc tế trong thời gian tới!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline font-display text-lg">Sản phẩm có phù hợp với da nhạy cảm không?</AccordionTrigger>
                        <AccordionContent className="text-[#666666] font-body">
                            Sản phẩm của chúng tôi được nghiên cứu dịu nhẹ, phù hợp với hầu hết các loại da, kể cả da nhạy cảm. Tuy nhiên, bạn nên thử trên vùng da nhỏ trước khi sử dụng toàn mặt.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
