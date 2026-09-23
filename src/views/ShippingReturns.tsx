'use client';

import InformationLayout from '@/components/InformationLayout';
import RichHtml from '@/components/cms/RichHtml';
import { useSection } from '@/components/cms/SectionsProvider';

const ShippingReturns = () => {
    const content = useSection('info.shipping');

    return (
        <InformationLayout
            currentPath="/shipping-returns"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            meta={content.meta || undefined}
        >
            {content.sections.map((section, index) => (
                <section key={index}>
                    {section.heading && <h2>{section.heading}</h2>}
                    <RichHtml html={section.body} />
                </section>
            ))}
        </InformationLayout>
    );
};

export default ShippingReturns;
