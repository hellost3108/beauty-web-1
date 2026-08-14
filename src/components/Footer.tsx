import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="pt-16 pb-4 md:pt-20 md:pb-6 bg-[#FAF9F7] border-t border-[#f5f5f5]">
      <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 mb-4">

          {/* STORE Column */}
          <div className="space-y-3">
            <h4 className="font-display text-xl md:text-2xl text-[#1a1a1a] tracking-tight">CỬA HÀNG</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#999999] shrink-0 mt-0.5" />
                <span className="font-body text-sm text-[#888888]">347 Nguyễn Trọng Tuyển, Phường Tân Sơn Hoà, Quận Tân Bình</span>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#999999] shrink-0 mt-0.5" />
                <span className="font-body text-sm text-[#888888]">08:30 - 18:30</span>
              </li>
            </ul>
          </div>

          {/* REACH US Column */}
          <div className="space-y-3">
            <h4 className="font-display text-xl md:text-2xl text-[#1a1a1a] tracking-tight">LIÊN HỆ</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#999999] shrink-0" />
                <span className="font-body text-sm text-[#888888]">+ 1234000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#999999] shrink-0" />
                <span className="font-body text-sm text-[#888888] hover:text-[#f01a33] transition-colors cursor-pointer">
                  metquatroiquaday@melalogy.com
                </span>
              </li>
            </ul>
          </div>

          {/* INFO Column */}
          <div className="space-y-3">
            <h4 className="font-display text-xl md:text-2xl text-[#1a1a1a] tracking-tight">THÔNG TIN</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="font-body text-sm text-[#888888] hover:text-[#f01a33] transition-colors">
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="font-body text-sm text-[#888888] hover:text-[#f01a33] transition-colors">
                  Vận Chuyển & Đổi Trả
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-body text-sm text-[#888888] hover:text-[#f01a33] transition-colors">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="font-body text-sm text-[#888888] hover:text-[#f01a33] transition-colors">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-body text-sm text-[#888888] hover:text-[#f01a33] transition-colors">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* SHARE WITH US Column */}
          <div className="space-y-3">
            <h4 className="font-display text-xl md:text-2xl text-[#1a1a1a] tracking-tight">KẾT NỐI VỚI CHÚNG TÔI</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f01a33] hover:text-white hover:border-[#f01a33] transition-all duration-300 cursor-pointer">
                <svg viewBox="0 0 48 48" aria-hidden="true" className="w-5 h-5">
                  <path d="M24 4C12.95 4 4 11.85 4 21.5c0 5.44 2.86 10.3 7.34 13.47-.24 2.03-1.15 4.6-2.09 6.53a.6.6 0 0 0 .8.79c2.87-1.24 5.9-3.05 7.7-4.28 2.03.55 4.2.85 6.25.85 11.05 0 20-7.85 20-17.5S35.05 4 24 4Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <text x="24" y="27" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif" fill="currentColor">Z</text>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f01a33] hover:text-white hover:border-[#f01a33] transition-all duration-300 cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f01a33] hover:text-white hover:border-[#f01a33] transition-all duration-300 cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f01a33] hover:text-white hover:border-[#f01a33] transition-all duration-300 cursor-pointer">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M16.6 5.82c-.9-.95-1.42-2.19-1.44-3.5H12.1v13.6c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.28 0 .55.04.8.12v-3.13a5.98 5.98 0 0 0-.8-.05c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6V9.3a8.9 8.9 0 0 0 4.9 1.48V7.72c-1.1 0-2.14-.35-2.9-.94a5.4 5.4 0 0 1-1.1-.96Z"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-[#f0f0f0] flex justify-center items-center">
          <p className="font-body text-sm text-[#999999]">
            © Bản quyền 2026 Melalogy. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
