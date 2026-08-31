'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

/*
 * Guideline 04 (Logo system) + 11 (Layout principles): black bar, white logo,
 * cherry reserved for the active item only. Nav labels follow the site map in
 * the website-edit deck: Melanin Science · Energy Shot · Journal · Shop.
 */
const navLinks = [
  { href: '/melanin-science', label: 'Melanin Science' },
  { href: '/collection', label: 'Energy Shot' },
  { href: '/blog', label: 'Journal' },
  { href: '/shop', label: 'Shop' },
];

type BrandNavProps = {
  /**
   * Pages whose first section is a full-bleed dark hero let the bar float over
   * it (as in the mockup). Everywhere else the bar stays solid black so white
   * type never lands on a light background.
   */
  overlay?: boolean;
};

const BrandNav = ({ overlay = false }: BrandNavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart } = useShop();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes whatever panel the user left open.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isCurrent = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <nav
      className="mlg-nav"
      data-scrolled={scrolled}
      data-overlay={overlay && !scrolled && !menuOpen && !searchOpen}
    >
      <div className="mlg-nav__inner">
        <Link href="/" className="mlg-nav__brand" aria-label="Melalogy — trang chủ">
          <img src="/assets/logo.png" alt="Melalogy" />
          <span className="mlg-nav__tagline">
            The science
            <br />
            of melanin
          </span>
        </Link>

        <div className="mlg-nav__links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mlg-nav__link"
              aria-current={isCurrent(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mlg-nav__actions">
          <button
            type="button"
            className="mlg-nav__icon"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-label="Tìm kiếm sản phẩm"
          >
            {searchOpen ? <X /> : <Search />}
          </button>

          <Link href="/login" className="mlg-nav__icon" aria-label="Tài khoản">
            <User />
          </Link>

          <Link href="/cart" className="mlg-nav__icon" aria-label="Giỏ hàng">
            <ShoppingBag />
            {cart.length > 0 && <span className="mlg-nav__count">{cart.length}</span>}
          </Link>

          <button
            type="button"
            className="mlg-nav__icon mlg-nav__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="mlg-nav__search">
          <form action="/search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              name="q"
              placeholder="Tìm công thức, hoạt chất hoặc trạng thái da…"
              autoFocus
            />
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="mlg-nav__drawer">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {link.label}
            </Link>
          ))}
          <Link href="/contact">
            <span>05</span>
            Liên hệ
          </Link>
        </div>
      )}
    </nav>
  );
};

export default BrandNav;
