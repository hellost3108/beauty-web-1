import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
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
            <a href="https://zalo.me/0702899707" target="_blank" rel="noopener noreferrer" aria-label="Zalo Melalogy">Z</a>
            <a href="https://www.instagram.com/melalogyvietnam/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Melalogy"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/melalogyvietnam/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Melalogy"><Facebook size={18} /></a>
            <a href="https://www.tiktok.com/@melalogy.vietnam" target="_blank" rel="noopener noreferrer" aria-label="TikTok Melalogy">♪</a>
          </div>
        </div>

        <div className={styles.contactColumn}>
          <span className={styles.columnLabel}>Cửa hàng & liên hệ</span>
          <div className={styles.contactItem}>
            <MapPin size={18} aria-hidden="true" />
            <p>29D Cộng Hòa 3,<br />Phường Phú Thọ Hòa, Thành phố Hồ Chí Minh</p>
          </div>
          <div className={styles.contactItem}>
            <Phone size={18} aria-hidden="true" />
            <a href="tel:+84702899707">0702 899 707</a>
          </div>
          <div className={styles.contactItem}>
            <Mail size={18} aria-hidden="true" />
            <a href="mailto:melalogyvietnam@gmail.com">melalogyvietnam@gmail.com</a>
          </div>
          <p className={styles.hours}>Mở cửa 09:00–22:00 mỗi ngày</p>
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
