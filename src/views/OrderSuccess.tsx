"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Banknote, CheckCircle2, Package, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bankTransferInfo } from "@/data/bankInfo";

const OrderSuccess = () => {
    const searchParams = useSearchParams();
    const orderCode = searchParams.get("code");
    const method = searchParams.get("method");

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-28 pb-20 px-6 max-w-2xl mx-auto text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h1 className="mt-6 font-display text-4xl text-[#111111]">Đặt hàng thành công!</h1>
                {orderCode && (
                    <p className="mt-3 text-black/60">
                        Mã đơn hàng của bạn: <strong className="text-[#b31324]">{orderCode}</strong>
                    </p>
                )}

                {method === "bank_transfer" ? (
                    <div className="mt-8 rounded-2xl border border-black/10 bg-[#faf8f5] p-6 text-left">
                        <div className="flex items-center gap-2 font-semibold text-[#111111]"><Banknote className="h-5 w-5 text-[#b31324]" /> Thông tin chuyển khoản</div>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-black/50">Ngân hàng</dt><dd className="font-medium">{bankTransferInfo.bankName}</dd></div>
                            <div className="flex justify-between"><dt className="text-black/50">Chủ tài khoản</dt><dd className="font-medium">{bankTransferInfo.accountName}</dd></div>
                            <div className="flex justify-between"><dt className="text-black/50">Số tài khoản</dt><dd className="font-medium">{bankTransferInfo.accountNumber}</dd></div>
                            <div className="flex justify-between"><dt className="text-black/50">Chi nhánh</dt><dd className="font-medium">{bankTransferInfo.branch}</dd></div>
                            <div className="flex justify-between"><dt className="text-black/50">Nội dung CK</dt><dd className="font-medium">{orderCode}</dd></div>
                        </dl>
                        <p className="mt-4 text-xs text-black/50">{bankTransferInfo.note}</p>
                    </div>
                ) : (
                    <div className="mt-8 rounded-2xl border border-black/10 bg-[#faf8f5] p-6 text-left">
                        <div className="flex items-center gap-2 font-semibold text-[#111111]"><Wallet className="h-5 w-5 text-[#b31324]" /> Thanh toán khi nhận hàng</div>
                        <p className="mt-3 text-sm text-black/60">Vui lòng chuẩn bị đúng số tiền và thanh toán trực tiếp cho đơn vị vận chuyển khi nhận sản phẩm.</p>
                    </div>
                )}

                <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/account" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b31324] px-6 py-3 text-sm font-semibold text-white hover:bg-[#850c18] transition-colors">
                        <Package className="h-4 w-4" /> Xem đơn hàng của tôi
                    </Link>
                    <Link href="/shop#shop-products" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black/70 hover:border-[#b31324] hover:text-[#b31324] transition-colors">
                        Tiếp tục mua sắm <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
