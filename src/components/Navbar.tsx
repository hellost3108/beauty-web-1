import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCollectionHover, setIsCollectionHover] = useState(false);
  const { cart, wishlist } = useShop();

  const collectionCategories = [
    { name: 'Chăm Sóc Da', image: "/assets/placeholder-300x300.png" },
    { name: 'Chăm Sóc Tóc', image: "/assets/placeholder-300x300.png" },
    { name: 'Cơ Thể', image: "/assets/placeholder-300x300.png" },
    { name: 'Sức Khỏe & Dụng Cụ', image: "/assets/placeholder-300x300.png" },
    { name: 'Bộ Quà Tặng', image: "/assets/placeholder-300x300.png" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 w-full">
      <div className="w-full px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile/Tablet Spacer for Centering */}
          <div className="flex-1 block lg:hidden" />

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            <div
              className="relative py-2"
              onMouseEnter={() => setIsCollectionHover(true)}
              onMouseLeave={() => setIsCollectionHover(false)}
            >
              <Link href="/collection" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                Bộ Sưu Tập
              </Link>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute top-full left-0 mt-0 pt-4 transition-all duration-300 transform origin-top-left ${isCollectionHover
                  ? 'opacity-100 translate-y-0 visible'
                  : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                  }`}
              >
                <div className="bg-white rounded-[24px] shadow-2xl border border-gray-100 p-8 w-[800px] grid grid-cols-5 gap-6">
                  {collectionCategories.map((cat, index) => (
                    <Link
                      key={index}
                      href={`/collection?category=${cat.name}`}
                      className="flex flex-col items-center gap-4 group"
                    >
                      <div className="w-32 h-32 rounded-[24px] overflow-hidden bg-gray-50">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <span className="font-display text-lg text-[#1a1a1a] group-hover:text-[#f01a33] transition-colors">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/shop" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Cửa Hàng
            </Link>
            <Link href="/about" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Giới Thiệu
            </Link>
            <Link href="/blog" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/magazine" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Tạp Chí
            </Link>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center" id="navbar-logo-container">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/assets/logo.png" alt="Bulsan Beauty" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
          </div>



          {/* Right side icons */}
          <div className="flex items-center gap-4 flex-1 justify-end relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors hidden lg:block"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Search Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl p-4 animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f01a33] text-sm"
                    autoFocus
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f01a33]">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <Link href="/wishlist" className="p-2 text-foreground hover:text-primary transition-colors hidden lg:block relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-button font-medium rounded-full flex items-center justify-center animate-in zoom-in spin-in-90 duration-300">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors hidden lg:block"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Account Dropdown */}
              {isAccountOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                  <Link
                    href="/login"
                    onClick={() => setIsAccountOpen(false)}
                    className="block px-4 py-3 text-sm font-body text-gray-700 hover:bg-gradient-to-r hover:from-[#f01a33] hover:to-[#e91e63] hover:text-white transition-all duration-200"
                  >
                    Đăng Nhập
                  </Link>
                  <div className="border-t border-gray-200" />
                  <Link
                    href="/signup"
                    onClick={() => setIsAccountOpen(false)}
                    className="block px-4 py-3 text-sm font-body text-gray-700 hover:bg-gradient-to-r hover:from-[#f01a33] hover:to-[#e91e63] hover:text-white transition-all duration-200"
                  >
                    Đăng Ký
                  </Link>
                </div>
              )}
            </div>
            <Link href="/cart" className="p-2 text-foreground hover:text-primary transition-colors hidden lg:block relative">
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-button font-medium rounded-full flex items-center justify-center animate-in zoom-in spin-in-90 duration-300">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary hover:scale-110 active:scale-95 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pt-6 pb-4 border-t border-border/50 mt-4 animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {/* Mobile Search Input */}
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f01a33] text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <Link href="/collection" className="font-body text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Bộ Sưu Tập
              </Link>
              <Link href="/shop" className="font-body text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Cửa Hàng
              </Link>
              <Link href="/about" className="font-body text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Giới Thiệu
              </Link>
              <Link href="/blog" className="font-body text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/magazine" className="font-body text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Tạp Chí
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-6">
                    <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="relative">
                    <Heart className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                    {wishlist.length > 0 && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-button font-medium rounded-full flex items-center justify-center animate-in zoom-in spin-in-90 duration-300">
                        {wishlist.length}
                        </span>
                    )}
                    </Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                    </Link>
                </div>
                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="relative mr-2">
                    <ShoppingBag className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-button font-medium rounded-full flex items-center justify-center animate-in zoom-in spin-in-90 duration-300">
                        {cart.length}
                        </span>
                    )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
