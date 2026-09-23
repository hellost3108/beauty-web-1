"use client";

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import InformationLayout from '@/components/InformationLayout';
import { useSection } from '@/components/cms/SectionsProvider';

const Contact = () => {
    const router = useRouter();
    const content = useSection('info.contact');
    const contact = useSection('global.contact');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        toast.success(content.successMessage);
        router.push('/');
    };

    return (
        <InformationLayout
            currentPath="/contact"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            meta={content.meta || undefined}
        >
            <section>
                <h2>{content.heading}</h2>
                <p>{content.body}</p>
                <div data-info-contact-grid>
                    <div><h3>Địa chỉ</h3><p>{contact.address.replace(/\s*\n\s*/g, ' ')}</p></div>
                    <div><h3>Điện thoại</h3><p><a href={contact.phoneHref || undefined}>{contact.phoneDisplay}</a></p></div>
                    <div><h3>Email</h3><p><a href={`mailto:${contact.email}`}>{contact.email}</a></p></div>
                    <div><h3>Giờ làm việc</h3><p>{contact.hours}</p></div>
                </div>
            </section>

            <section>
                <h2>{content.formHeading}</h2>
                <form data-info-form onSubmit={handleSubmit}>
                    <div data-info-form-row>
                        <label>{content.nameLabel}<input required type="text" placeholder="Tên của bạn" autoComplete="name" /></label>
                        <label>{content.emailLabel}<input required type="email" placeholder="email@domain.com" autoComplete="email" /></label>
                    </div>
                    <label>{content.messageLabel}<textarea required rows={5} placeholder={content.messagePlaceholder} /></label>
                    <button type="submit">{content.submitLabel} <ArrowRight size={18} aria-hidden="true" /></button>
                </form>
            </section>
        </InformationLayout>
    );
};

export default Contact;
