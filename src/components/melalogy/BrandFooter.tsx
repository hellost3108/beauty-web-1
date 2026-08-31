import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const primaryLinks = [
  { href: '/melanin-science', label: 'Melanin Science' },
  { href: '/blog', label: 'Journal' },
  { href: '/shop', label: 'Shop' },
];

const legalLinks = [
  { href: '/privacy', label: 'Chính sách bảo mật' },
  { href: '/terms', label: 'Điều khoản dịch vụ' },
  { href: '/shipping-returns', label: 'Vận chuyển & đổi trả' },
  { href: '/contact', label: 'Liên hệ' },
];

const BrandFooter = () => (
  <footer className="mlg-footer">
    <div className="mlg-footer__inner">
      <div className="mlg-footer__brand">
        <img src="/assets/logo.png" alt="Melalogy" />
        <p>The Science of Melanin.</p>
      </div>

      <nav className="mlg-footer__nav" aria-label="Điều hướng Melalogy">
        {primaryLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Contact stays in the footer so every page carries it, not just home. */}
      <address className="mlg-footer__contact">
        <a href="tel:+84702899707">
          <Phone aria-hidden="true" />
          0702 899 707
        </a>
        <a href="mailto:melalogyvietnam@gmail.com">
          <Mail aria-hidden="true" />
          melalogyvietnam@gmail.com
        </a>
        <span>
          <MapPin aria-hidden="true" />
          29D Cộng Hòa 3, P. Phú Thọ Hòa, TP. Hồ Chí Minh
        </span>
      </address>
    </div>

    <div className="mlg-footer__legal">
      <p>© 2026 Melalogy. Đã đăng ký bản quyền.</p>
      <nav aria-label="Thông tin pháp lý">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
);

export default BrandFooter;
