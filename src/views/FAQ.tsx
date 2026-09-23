'use client';

import InformationLayout from '@/components/InformationLayout';
import RichHtml from '@/components/cms/RichHtml';
import { useSection } from '@/components/cms/SectionsProvider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
    const content = useSection('info.faq');

    return (
        <InformationLayout
            currentPath="/faq"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            meta={content.meta || undefined}
        >
            <section>
                {content.listHeading && <h2>{content.listHeading}</h2>}
                <Accordion type="single" collapsible data-info-accordion>
                    {content.questions.map(({ question, answer }, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent><p>{answer}</p></AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {(content.closingHeading || content.closingBody) && (
                <section>
                    {content.closingHeading && <h2>{content.closingHeading}</h2>}
                    <RichHtml html={content.closingBody} />
                </section>
            )}
        </InformationLayout>
    );
};

export default FAQ;
