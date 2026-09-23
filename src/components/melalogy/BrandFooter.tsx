'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';

type BrandFooterProps = {
  compact?: boolean;
};

const BrandFooter = ({ compact = false }: BrandFooterProps) => {
  const brand = useSection('global.brand');
  const navigation = useSection('global.navigation');
  const contact = useSection('global.contact');

  return (
  <footer className={`mlg-footer${compact ? ' mlg-footer--compact' : ''}`}>
    <div className="mlg-footer__inner">
      <div className="mlg-footer__brand">
        <img src={brand.logo || '/assets/logo.png'} alt="Melalogy" />
        <p>{brand.footerTagline}</p>
      </div>

      <nav className="mlg-footer__nav" aria-label="Điều hướng Melalogy">
        {navigation.footerLinks.map((link, index) => (
          <Link key={`${link.href}-${index}`} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {!compact && (
        <address className="mlg-footer__contact">
          {contact.phoneDisplay && (
            <a href={contact.phoneHref || undefined}>
              <Phone aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`}>
              <Mail aria-hidden="true" />
              {contact.email}
            </a>
          )}
          {contact.addressShort && (
            <span>
              <MapPin aria-hidden="true" />
              {contact.addressShort}
            </span>
          )}
        </address>
      )}
    </div>

    <div className="mlg-footer__legal">
      <p>{brand.copyright}</p>
      <nav aria-label="Thông tin pháp lý">
        {navigation.legalLinks.map((link, index) => (
          <Link key={`${link.href}-${index}`} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
  );
};

export default BrandFooter;
