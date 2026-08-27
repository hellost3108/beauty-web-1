import { ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import BrandFooter from '@/components/melalogy/BrandFooter';
import BrandNav from '@/components/melalogy/BrandNav';
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

const InformationLayout = ({ children, currentPath, eyebrow, intro, meta, title }: InformationLayoutProps) => {
    const currentIndex = informationLinks.findIndex((link) => link.href === currentPath) + 1;

    return (
        <div className={styles.page} data-motion-page>
            <div className={styles.progress} aria-hidden="true" />
            <BrandNav />

            <main>
                <section className={styles.hero}>
                    <div className={styles.heroOrb} aria-hidden="true" />
                    <div className={styles.heroInner}>
                        <div data-reveal="up" className={styles.heroTitle}>
                            <span className={styles.eyebrow}>{eyebrow}</span>
                            <h1 className={styles.title}>{title}</h1>
                        </div>
                        <div data-reveal="up" data-reveal-delay="100" className={styles.heroAside}>
                            <span className={styles.chapter}>
                                Hồ sơ {String(currentIndex).padStart(2, '0')} / {String(informationLinks.length).padStart(2, '0')}
                            </span>
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

                            <Link href="mailto:melalogyvietnam@gmail.com" className={styles.supportCard}>
                                <Mail size={19} aria-hidden="true" />
                                <span>
                                    <small>Cần hỗ trợ thêm?</small>
                                    Gửi email cho Melalogy
                                </span>
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </Link>
                        </aside>

                        <article data-reveal="up" data-reveal-delay="80" className={styles.content}>
                            <div className={styles.contentMeta} aria-hidden="true">
                                <span>Melalogy Information Studio</span>
                                <span>{String(currentIndex).padStart(2, '0')} / {String(informationLinks.length).padStart(2, '0')}</span>
                            </div>
                            {children}
                        </article>
                    </div>
                </section>
            </main>

            <BrandFooter />
        </div>
    );
};

export default InformationLayout;
