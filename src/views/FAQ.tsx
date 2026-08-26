import InformationLayout from '@/components/InformationLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const questions = [
    ['Sản phẩm Melalogy có thuần chay và không thử nghiệm trên động vật không?', 'Có. Toàn bộ sản phẩm Melalogy đều thuần chay và không thử nghiệm trên động vật. Chúng tôi tin vào vẻ đẹp không gây tổn hại.'],
    ['Làm sao để theo dõi đơn hàng của tôi?', 'Sau khi đơn hàng được bàn giao cho đơn vị vận chuyển, bạn sẽ nhận được email xác nhận kèm mã vận đơn để theo dõi hành trình đơn hàng.'],
    ['Chính sách đổi trả như thế nào?', 'Melalogy hỗ trợ đổi trả trong vòng 30 ngày đối với sản phẩm chưa sử dụng, còn nguyên trạng và nguyên bao bì.'],
    ['Melalogy có giao hàng quốc tế không?', 'Hiện tại chúng tôi giao hàng trên toàn quốc Việt Nam và đang chuẩn bị các điều kiện để mở rộng giao hàng quốc tế.'],
    ['Sản phẩm có phù hợp với da nhạy cảm không?', 'Sản phẩm được nghiên cứu theo hướng dịu nhẹ và phù hợp với nhiều loại da. Với làn da nhạy cảm, bạn nên thử trên vùng da nhỏ trước khi sử dụng toàn mặt.'],
    ['Tôi nên chọn Energy Shot nào?', 'Hãy bắt đầu từ tín hiệu hiện tại của làn da: Hydrating cho da khô căng, Recovery cho da cần phục hồi, Brightening cho bề mặt xỉn màu và Radiance để duy trì vẻ rạng rỡ.'],
];

const FAQ = () => (
    <InformationLayout
        currentPath="/faq"
        eyebrow="Điều bạn muốn biết"
        title="Câu hỏi thường gặp"
        intro="Những câu trả lời ngắn gọn về sản phẩm, đơn hàng và cách Melalogy đồng hành cùng làn da của bạn."
        meta="Hỏi nhanh, hiểu rõ"
    >
        <section>
            <h2>Thông tin bạn có thể cần</h2>
            <Accordion type="single" collapsible data-info-accordion>
                {questions.map(([question, answer], index) => (
                    <AccordionItem key={question} value={`item-${index + 1}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent><p>{answer}</p></AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>

        <section>
            <h2>Chưa tìm thấy câu trả lời?</h2>
            <p>Hãy gửi câu hỏi đến <strong>metquatroiquaday@melalogy.com</strong>. Đội ngũ Melalogy sẽ phản hồi trong 1–2 ngày làm việc.</p>
        </section>
    </InformationLayout>
);

export default FAQ;
