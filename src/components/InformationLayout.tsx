import { ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import styles from './InformationLayout.module.css';

const informationLinks = [
    { href: '/contact', label: 'Liên hệ' },
    { href: '/shipping-returns', label: 'Vận chuyển & đổi trả' },
    { href: '/faq', label: 'Câu hỏi thường gặp' },
    { href: '/privacy', label: 'Chính sách bảo mật' },
    { href: '/terms', label: 'Điều khoản dịch vụ' },
];

type InformationLayoutProps = {
    children: ReactNode;
    currentPath: string;
    eyebrow: string;
    intro: string;
    meta?: string;
    title: string;
};

const InformationLayout = ({ children, currentPath, eyebrow, intro, meta, title }: InformationLayoutProps) => (
    <div className={styles.page} data-motion-page>
        <Navbar />

        <main>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div data-reveal="up">
                        <span className={styles.eyebrow}>{eyebrow}</span>
                        <h1 className={styles.title}>{title}</h1>
                    </div>
                    <div data-reveal="up" data-reveal-delay="100" className={styles.heroAside}>
                        {meta && <span className={styles.meta}>{meta}</span>}
                        <p>{intro}</p>
                    </div>
                </div>
            </section>

            <section className={styles.body}>
                <div className={styles.bodyGrid}>
                    <aside data-reveal="left" className={styles.rail} aria-label="Điều hướng trang thông tin">
                        <span className={styles.railLabel}>Thông tin Melalogy</span>
                        <nav className={styles.infoNav}>
                            {informationLinks.map((link, index) => {
                                const isActive = link.href === currentPath;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={isActive ? styles.activeLink : styles.infoLink}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                        {link.label}
                                        <ArrowUpRight size={15} aria-hidden="true" />
                                    </Link>
                                );
                            })}
                        </nav>

                        <Link href="mailto:metquatroiquaday@melalogy.com" className={styles.supportCard}>
                            <Mail size={19} aria-hidden="true" />
                            <span>
                                <small>Cần hỗ trợ thêm?</small>
                                Gửi email cho Melalogy
                            </span>
                        </Link>
                    </aside>

                    <article data-reveal="up" data-reveal-delay="80" className={styles.content}>
                        {children}
                    </article>
                </div>
            </section>
        </main>

        <Footer />
    </div>
);

export default InformationLayout;
