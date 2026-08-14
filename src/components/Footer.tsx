import { Instagram, Twitter, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
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
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f01a33] hover:text-white hover:border-[#f01a33] transition-all duration-300 cursor-pointer">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f01a33] hover:text-white hover:border-[#f01a33] transition-all duration-300 cursor-pointer">
                <Globe className="w-5 h-5" />
              </div>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-[#f0f0f0] flex justify-center items-center">
          <p className="font-body text-sm text-[#999999]">
            © Bản quyền 2025 Melalogy. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
