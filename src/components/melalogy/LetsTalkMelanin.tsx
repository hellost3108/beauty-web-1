import Link from 'next/link';
import { ArrowRight, Facebook, Handshake, Headphones, Instagram, Mail, MapPin, Package, Phone } from 'lucide-react';

/*
 * Section 6 of the website-edit deck: "Liên hệ".
 * Contact details are the brand's real ones already published on the site —
 * the mockup's hello@ / 1900 hotline are design placeholders and are
 * deliberately not used.
 */
const channels = [
  {
    index: '01',
    icon: Headphones,
    title: 'Tư vấn sản phẩm',
    copy: 'Không biết Energy Shot nào phù hợp với trạng thái da hiện tại?',
    action: { href: '/contact', label: 'Nhắn Melalogy' },
  },
  {
    index: '02',
    icon: Package,
    title: 'Chăm sóc khách hàng',
    copy: 'Đơn hàng, sử dụng sản phẩm hoặc những vấn đề cần hỗ trợ.',
    action: { href: '/shipping-returns', label: 'Liên hệ CSKH' },
  },
  {
    index: '03',
    icon: Handshake,
    title: 'Hợp tác cùng Melalogy',
    copy: 'Dành cho đối tác phân phối, KOL/KOC, báo chí và cơ hội hợp tác thương hiệu.',
    action: { href: '/contact', label: 'Kết nối với chúng tôi' },
  },
];

const LetsTalkMelanin = () => (
  <section className="mlg-section mlg-dark mlg-contact-section" aria-labelledby="mlg-contact-title">
    <div className="mlg-shell mlg-contact mlg-rise">
      <div className="mlg-contact-art" aria-hidden="true">
        <img src="/assets/brand-banner-melanin.png" alt="" loading="lazy" />
        <span>06 / CONNECT</span>
      </div>

      <div className="mlg-contact-main">
        <p className="mlg-eyebrow mlg-eyebrow--rule">Liên hệ Melalogy</p>
        <h2 className="mlg-display" id="mlg-contact-title">
          Let’s talk
          <em>melanin.</em>
        </h2>
        <p className="mlg-copy">
          Cần tư vấn sản phẩm, hỗ trợ đơn hàng hoặc muốn hợp tác cùng Melalogy? Chúng tôi luôn sẵn
          sàng lắng nghe.
        </p>

        <div className="mlg-card-row">
          {channels.map(({ index, icon: Icon, title, copy, action }) => (
            <article className="mlg-card" key={index}>
              <span className="mlg-card__icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="mlg-card__index">{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link href={action.href} className="mlg-link">
                {action.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="mlg-contact-detail">
        <div>
          <Mail aria-hidden="true" />
          <div>
            <strong>Email</strong>
            <a href="mailto:melalogyvietnam@gmail.com">melalogyvietnam@gmail.com</a>
          </div>
        </div>

        <div>
          <Phone aria-hidden="true" />
          <div>
            <strong>Hotline</strong>
            <a href="tel:+84702899707">0702 899 707</a>
            <small>09:00 – 22:00 mỗi ngày</small>
          </div>
        </div>

        <div>
          <MapPin aria-hidden="true" />
          <div>
            <strong>Cửa hàng</strong>
            <p>
              29D Cộng Hòa 3, Phường Phú Thọ Hòa,
              <br />
              Thành phố Hồ Chí Minh
            </p>
          </div>
        </div>

        <div>
          <Instagram aria-hidden="true" />
          <div>
            <strong>Theo dõi Melalogy</strong>
            <div className="mlg-socials">
              <a
                href="https://www.instagram.com/melalogyvietnam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Melalogy"
              >
                <Instagram aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/melalogyvietnam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Melalogy"
              >
                <Facebook aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@melalogy.vietnam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Melalogy"
              >
                ♪
              </a>
              <a
                href="https://zalo.me/0702899707"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo Melalogy"
              >
                Z
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LetsTalkMelanin;
