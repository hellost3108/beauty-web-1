"use client";

import { ArrowRight, Headphones, LockKeyhole, RefreshCcw, Truck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import styles from './FanClubSection.module.css';

const benefits = [
    { icon: Truck, index: '01', title: 'Giao hàng toàn quốc', detail: 'Miễn phí cho đơn từ 500.000₫' },
    { icon: RefreshCcw, index: '02', title: 'Đổi trả rõ ràng', detail: 'Hỗ trợ trong vòng 30 ngày' },
    { icon: Headphones, index: '03', title: 'Tư vấn chăm sóc da', detail: '08:30–18:30 mỗi ngày' },
    { icon: LockKeyhole, index: '04', title: 'Thanh toán bảo mật', detail: 'Thông tin giao dịch được bảo vệ' },
];

const FanClubSection = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) return toast.error('Vui lòng nhập địa chỉ email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Vui lòng nhập địa chỉ email hợp lệ');
        toast.success('Đăng ký bản tin thành công!');
        setEmail('');
    };

    return (
        <section className={styles.section} aria-labelledby="newsletter-title">
            <div className={styles.shell}>
                <div data-reveal="left" className={styles.newsletter}>
                    <span className={styles.eyebrow}>Melalogy Notes</span>
                    <h2 id="newsletter-title" className={styles.title}>
                        Một lá thư đẹp,<br /><em>vừa đủ mỗi tháng.</em>
                    </h2>
                    <p className={styles.description}>
                        Công thức mới, cách đọc tín hiệu làn da và ưu đãi dành riêng cho cộng đồng Melalogy.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit} data-reveal="up" data-reveal-delay="100">
                        <label className={styles.srOnly} htmlFor="newsletter-email">Địa chỉ email</label>
                        <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email của bạn"
                            autoComplete="email"
                            suppressHydrationWarning
                        />
                        <button type="submit" aria-label="Đăng ký nhận bản tin Melalogy">
                            Đăng ký <ArrowRight size={19} aria-hidden="true" />
                        </button>
                    </form>
                    <small className={styles.consent}>Không làm phiền. Bạn có thể huỷ đăng ký bất cứ lúc nào.</small>
                </div>

                <div data-reveal="right" data-reveal-delay="120" className={styles.benefits}>
                    {benefits.map(({ icon: Icon, index, title, detail }) => (
                        <div key={index} className={styles.benefit}>
                            <div className={styles.benefitTop}>
                                <span>{index}</span>
                                <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                            </div>
                            <strong>{title}</strong>
                            <small>{detail}</small>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FanClubSection;
