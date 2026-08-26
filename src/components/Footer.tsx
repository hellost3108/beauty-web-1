import { ArrowUpRight, Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

import styles from './Footer.module.css';

const infoLinks = [
  { href: '/contact', label: 'Liên hệ' },
  { href: '/shipping-returns', label: 'Vận chuyển & đổi trả' },
  { href: '/faq', label: 'Câu hỏi thường gặp' },
  { href: '/privacy', label: 'Chính sách bảo mật' },
  { href: '/terms', label: 'Điều khoản dịch vụ' },
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.shell}>
      <div className={styles.topline}>
        <span>MELALOGY® / VIETNAM</span>
        <span>THE SCIENCE OF MELANIN</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.brandColumn}>
          <p className={styles.brandStatement}>
            Lắng nghe tín hiệu.<br />
            <em>Chọn đúng công thức.</em>
          </p>
          <div className={styles.socials} aria-label="Mạng xã hội Melalogy">
            <a href="#" aria-label="Zalo">Z</a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="TikTok">♪</a>
          </div>
        </div>

        <div className={styles.contactColumn}>
          <span className={styles.columnLabel}>Cửa hàng & liên hệ</span>
          <div className={styles.contactItem}>
            <MapPin size={18} aria-hidden="true" />
            <p>347 Nguyễn Trọng Tuyển,<br />Phường Tân Sơn Hoà, Quận Tân Bình</p>
          </div>
          <div className={styles.contactItem}>
            <Mail size={18} aria-hidden="true" />
            <a href="mailto:metquatroiquaday@melalogy.com">metquatroiquaday@melalogy.com</a>
          </div>
          <p className={styles.hours}>Mở cửa 08:30–18:30 mỗi ngày</p>
        </div>

        <nav className={styles.infoColumn} aria-label="Thông tin Melalogy">
          <span className={styles.columnLabel}>Thông tin</span>
          {infoLinks.map((link, index) => (
            <Link key={link.href} href={link.href} className={styles.infoLink}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {link.label}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottomline}>
        <p>© 2026 Melalogy. Đã đăng ký bản quyền.</p>
        <p>Beauty starts with understanding.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
