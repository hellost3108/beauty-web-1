'use client';

import InformationLayout from '@/components/InformationLayout';
import RichHtml from '@/components/cms/RichHtml';
import { useSection } from '@/components/cms/SectionsProvider';

const Privacy = () => {
    const content = useSection('info.privacy');

    return (
        <InformationLayout
            currentPath="/privacy"
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

export default Privacy;
