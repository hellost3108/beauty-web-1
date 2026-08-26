import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import styles from './DiscoverNext.module.css';

const DiscoverNext = () => {
    return (
        <section className={styles.section} aria-labelledby="discover-next-title">
            <div className={styles.shell}>
                <header className={styles.header}>
                    <div data-reveal="up" className={styles.headingGroup}>
                        <span className={styles.eyebrow}>Tiếp tục khám phá</span>
                        <h2 id="discover-next-title" className={styles.title}>
                            Chăm da đẹp hơn<br />
                            khi <em>hiểu đúng hơn.</em>
                        </h2>
                    </div>

                    <p data-reveal="up" data-reveal-delay="100" className={styles.intro}>
                        Khám phá công thức Energy Shot phù hợp với làn da, hoặc tiếp tục đọc những
                        góc nhìn chăm sóc da được Melalogy chọn lọc.
                    </p>
                </header>

                <div className={styles.grid} data-motion-stagger>
                    <Link
                        href="/collection"
                        aria-label="Khám phá toàn bộ bộ sưu tập Energy Shot"
                        data-reveal="left"
                        className={styles.card}
                    >
                        <img
                            data-parallax="0.025"
                            src="/assets/shop-hero.png"
                            alt="Bốn công thức mặt nạ Energy Shot của Melalogy"
                            className={styles.image}
                        />
                        <span className={styles.scrim} aria-hidden="true" />
                        <span className={styles.cardNumber}>01</span>
                        <span className={styles.cardContent}>
                            <span className={styles.cardLabel}>Bộ sưu tập Energy Shot</span>
                            <strong className={styles.cardTitle}>
                                Chọn đúng công thức cho điều da đang cần.
                            </strong>
                            <span className={styles.cardAction}>
                                Xem toàn bộ sản phẩm
                                <span className={styles.actionIcon} aria-hidden="true">
                                    <ArrowUpRight size={20} strokeWidth={1.8} />
                                </span>
                            </span>
                        </span>
                    </Link>

                    <Link
                        href="/blog"
                        aria-label="Đọc blog chăm sóc da của Melalogy"
                        data-reveal="right"
                        data-reveal-delay="120"
                        className={`${styles.card} ${styles.blogCard}`}
                    >
                        <img
                            data-parallax="0.025"
                            src="/assets/skincare-face-lifestyle.jpg"
                            alt="Chăm sóc và thấu hiểu làn da cùng Melalogy"
                            className={styles.image}
                        />
                        <span className={styles.scrim} aria-hidden="true" />
                        <span className={styles.cardNumber}>02</span>
                        <span className={styles.cardContent}>
                            <span className={styles.cardLabel}>Melalogy Journal</span>
                            <strong className={styles.cardTitle}>
                                Hiểu làn da trước khi thêm một bước chăm sóc.
                            </strong>
                            <span className={styles.cardAction}>
                                Đọc câu chuyện mới
                                <span className={styles.actionIcon} aria-hidden="true">
                                    <ArrowUpRight size={20} strokeWidth={1.8} />
                                </span>
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DiscoverNext;
