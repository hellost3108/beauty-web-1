'use client';

import Link from 'next/link';
import { useSection } from '@/components/cms/SectionsProvider';
import { splitLines } from '@/lib/cms/registry';
import { ArrowRight, Facebook, Handshake, Headphones, Instagram, Mail, MapPin, Package, Phone } from 'lucide-react';

/*
 * Section 6 of the website-edit deck: "Liên hệ".
 * Copy is edited in Admin → Trang chủ → Liên hệ; email, hotline, address and
 * social links come from Admin → Header, footer & thông tin chung.
 */
const channelIcons = [Headphones, Package, Handshake];

const LetsTalkMelanin = () => {
  const content = useSection('home.contact');
  const contact = useSection('global.contact');
  const socials = [
    { href: contact.instagram, label: 'Instagram Melalogy', icon: <Instagram aria-hidden="true" /> },
    { href: contact.facebook, label: 'Facebook Melalogy', icon: <Facebook aria-hidden="true" /> },
    { href: contact.tiktok, label: 'TikTok Melalogy', icon: '♪' },
    { href: contact.zalo, label: 'Zalo Melalogy', icon: 'Z' },
  ].filter((social) => social.href);

  return (
  <section className="mlg-section mlg-dark mlg-contact-section" aria-labelledby="mlg-contact-title">
    <div className="mlg-shell mlg-contact mlg-rise">
      <div className="mlg-contact-art" aria-hidden="true">
        {content.artImage && <img src={content.artImage} alt="" loading="lazy" />}
        <span>{content.artLabel}</span>
      </div>

      <div className="mlg-contact-main">
        <p className="mlg-eyebrow mlg-eyebrow--rule">{content.eyebrow}</p>
        <h2 className="mlg-display" id="mlg-contact-title">
          {content.title}
          {content.titleAccent && <em>{content.titleAccent}</em>}
        </h2>
        <p className="mlg-copy">{content.description}</p>

        <div className="mlg-card-row">
          {content.channels.map((channel, position) => {
            const Icon = channelIcons[position % channelIcons.length];
            return (
              <article className="mlg-card" key={position}>
                <span className="mlg-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="mlg-card__index">{String(position + 1).padStart(2, '0')}</span>
                <h3>{channel.title}</h3>
                <p>{channel.copy}</p>
                {channel.href && (
                  <Link href={channel.href} className="mlg-link">
                    {channel.linkLabel}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className="mlg-contact-detail">
        <div>
          <Mail aria-hidden="true" />
          <div>
            <strong>Email</strong>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>

        <div>
          <Phone aria-hidden="true" />
          <div>
            <strong>Hotline</strong>
            <a href={contact.phoneHref || undefined}>{contact.phoneDisplay}</a>
            {contact.hours && <small>{contact.hours}</small>}
          </div>
        </div>

        <div>
          <MapPin aria-hidden="true" />
          <div>
            <strong>Cửa hàng</strong>
            <p>
              {splitLines(contact.address).map((line, index) => (
                <span key={index}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div>
          <Instagram aria-hidden="true" />
          <div>
            <strong>{content.followLabel}</strong>
            <div className="mlg-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default LetsTalkMelanin;
