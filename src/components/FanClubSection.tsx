"use client";

import { ArrowRight, Headphones, LockKeyhole, RefreshCcw, Truck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import styles from './FanClubSection.module.css';
import { useSection } from '@/components/cms/SectionsProvider';

const benefitIcons = [Truck, RefreshCcw, Headphones, LockKeyhole];

const FanClubSection = () => {
    const [email, setEmail] = useState('');
    const content = useSection('global.newsletter');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) return toast.error('Vui lòng nhập địa chỉ email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Vui lòng nhập địa chỉ email hợp lệ');
        toast.success(content.successMessage);
        setEmail('');
    };

    return (
        <section className={styles.section} aria-labelledby="newsletter-title">
            <div className={styles.shell}>
                <div data-reveal="left" className={styles.newsletter}>
                    <span className={styles.eyebrow}>{content.eyebrow}</span>
                    <h2 id="newsletter-title" className={styles.title}>
                        {content.title}
                        {content.titleAccent && (
                            <>
                                <br />
                                <em>{content.titleAccent}</em>
                            </>
                        )}
                    </h2>
                    <p className={styles.description}>{content.description}</p>

                    <form className={styles.form} onSubmit={handleSubmit} data-reveal="up" data-reveal-delay="100">
                        <label className={styles.srOnly} htmlFor="newsletter-email">Địa chỉ email</label>
                        <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={content.placeholder}
                            autoComplete="email"
                            suppressHydrationWarning
                        />
                        <button type="submit" aria-label="Đăng ký nhận bản tin Melalogy">
                            {content.buttonLabel} <ArrowRight size={19} aria-hidden="true" />
                        </button>
                    </form>
                    <small className={styles.consent}>{content.consent}</small>
                </div>

                <div data-reveal="right" data-reveal-delay="120" className={styles.benefits}>
                    {content.benefits.map(({ title, detail }, position) => {
                        const Icon = benefitIcons[position % benefitIcons.length];
                        return (
                        <div key={position} className={styles.benefit}>
                            <div className={styles.benefitTop}>
                                <span>{String(position + 1).padStart(2, '0')}</span>
                                <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                            </div>
                            <strong>{title}</strong>
                            <small>{detail}</small>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FanClubSection;
