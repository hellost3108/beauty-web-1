"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, MapPin, Package, Plus, Star, Trash2, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { deleteAddress, setDefaultAddress, updateProfileName, upsertAddress } from "@/app/_actions/customer";
import type { Address, CustomerProfile, OrderRecord } from "@/types/customer";
import { orderStatusLabel, paymentMethodLabel, paymentStatusLabel } from "@/types/customer";

const formatVnd = (value: number) => `${value.toLocaleString("vi-VN")}đ`;
const formatDate = (value: string) => new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

type Tab = "profile" | "addresses" | "orders";

const emptyAddressForm = { full_name: "", phone: "", address: "", ward: "", district: "", city: "", note: "" };

interface AccountProps {
    profile: CustomerProfile;
    addresses: Address[];
    orders: OrderRecord[];
}

const Account = ({ profile, addresses, orders }: AccountProps) => {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("profile");
    const [isPending, startTransition] = useTransition();
    const [fullName, setFullName] = useState(profile.fullName ?? "");
    const [addressForm, setAddressForm] = useState(emptyAddressForm);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        toast.success("Đã đăng xuất.");
        router.push("/");
        router.refresh();
    };

    const handleSaveName = () => {
        startTransition(async () => {
            const result = await updateProfileName(fullName);
            if (result.ok) {
                toast.success("Đã cập nhật thông tin tài khoản.");
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleAddAddress = () => {
        startTransition(async () => {
            const result = await upsertAddress(addressForm);
            if (result.ok) {
                toast.success("Đã lưu địa chỉ.");
                setAddressForm(emptyAddressForm);
                setShowAddressForm(false);
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleDeleteAddress = (id: string) => {
        startTransition(async () => {
            const result = await deleteAddress(id);
            if (result.ok) {
                toast.success("Đã xoá địa chỉ.");
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleSetDefault = (id: string) => {
        startTransition(async () => {
            const result = await setDefaultAddress(id);
            if (result.ok) {
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
                <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b31324]">Tài khoản của tôi</p>
                        <h1 className="font-display text-4xl mt-2 text-[#111111]">Xin chào, {profile.fullName || profile.email}</h1>
                        <p className="text-sm text-black/50 mt-1">{profile.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 hover:border-[#b31324] hover:text-[#b31324] transition-colors"
                    >
                        <LogOut className="h-4 w-4" /> Đăng xuất
                    </button>
                </header>

                <nav className="flex gap-2 border-b border-black/10 mb-8">
                    {[
                        { id: "profile" as Tab, label: "Thông tin", icon: UserIcon },
                        { id: "addresses" as Tab, label: "Sổ địa chỉ", icon: MapPin },
                        { id: "orders" as Tab, label: "Đơn hàng của tôi", icon: Package },
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                                tab === id ? "border-[#b31324] text-[#b31324]" : "border-transparent text-black/50 hover:text-black/80"
                            }`}
                        >
                            <Icon className="h-4 w-4" /> {label}
                        </button>
                    ))}
                </nav>

                {tab === "profile" && (
                    <section className="max-w-md space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b31324]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input value={profile.email} disabled className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
                        </div>
                        <button
                            onClick={handleSaveName}
                            disabled={isPending}
                            className="rounded-lg bg-[#b31324] px-6 py-3 text-sm font-semibold text-white hover:bg-[#850c18] transition-colors disabled:opacity-60"
                        >
                            Lưu thay đổi
                        </button>
                    </section>
                )}

                {tab === "addresses" && (
                    <section className="space-y-5">
                        {addresses.map((addr) => (
                            <article key={addr.id} className="rounded-2xl border border-black/10 p-5 flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <strong>{addr.full_name}</strong>
                                        {addr.is_default && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                                                <Star className="h-3 w-3" /> Mặc định
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-black/60 mt-1">{addr.phone}</p>
                                    <p className="text-sm text-black/60">{[addr.address, addr.ward, addr.district, addr.city].filter(Boolean).join(", ")}</p>
                                </div>
                                <div className="flex flex-col gap-2 items-end shrink-0">
                                    {!addr.is_default && (
                                        <button onClick={() => handleSetDefault(addr.id)} className="text-xs font-semibold text-[#b31324] hover:underline">
                                            Đặt làm mặc định
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteAddress(addr.id)} className="inline-flex items-center gap-1 text-xs font-semibold text-black/40 hover:text-red-600">
                                        <Trash2 className="h-3.5 w-3.5" /> Xoá
                                    </button>
                                </div>
                            </article>
                        ))}
                        {addresses.length === 0 && !showAddressForm && (
                            <p className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-black/45">Bạn chưa có địa chỉ nào được lưu.</p>
                        )}

                        {showAddressForm ? (
                            <div className="rounded-2xl border border-black/10 p-5 grid gap-4 sm:grid-cols-2">
                                <input placeholder="Họ và tên người nhận" value={addressForm.full_name} onChange={(e) => setAddressForm((f) => ({ ...f, full_name: e.target.value }))} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm sm:col-span-2" />
                                <input placeholder="Số điện thoại" value={addressForm.phone} onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm" />
                                <input placeholder="Tỉnh/Thành phố" value={addressForm.city} onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm" />
                                <input placeholder="Quận/Huyện" value={addressForm.district} onChange={(e) => setAddressForm((f) => ({ ...f, district: e.target.value }))} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm" />
                                <input placeholder="Phường/Xã" value={addressForm.ward} onChange={(e) => setAddressForm((f) => ({ ...f, ward: e.target.value }))} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm" />
                                <input placeholder="Địa chỉ cụ thể (số nhà, tên đường)" value={addressForm.address} onChange={(e) => setAddressForm((f) => ({ ...f, address: e.target.value }))} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm sm:col-span-2" />
                                <div className="flex gap-3 sm:col-span-2">
                                    <button onClick={handleAddAddress} disabled={isPending} className="rounded-lg bg-[#b31324] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">Lưu địa chỉ</button>
                                    <button onClick={() => { setShowAddressForm(false); setAddressForm(emptyAddressForm); }} className="rounded-lg border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/60">Huỷ</button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setShowAddressForm(true)} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 hover:border-[#b31324] hover:text-[#b31324]">
                                <Plus className="h-4 w-4" /> Thêm địa chỉ mới
                            </button>
                        )}
                    </section>
                )}

                {tab === "orders" && (
                    <section className="space-y-5">
                        {orders.map((order) => (
                            <article key={order.id} className="rounded-2xl border border-black/10 p-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-semibold">Đơn hàng #{order.order_code}</p>
                                        <p className="text-xs text-black/45 mt-0.5">{formatDate(order.created_at)} · {paymentMethodLabel[order.payment_method]}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{orderStatusLabel[order.status]}</span>
                                        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/60">{paymentStatusLabel[order.payment_status]}</span>
                                    </div>
                                </div>
                                <div className="mt-4 divide-y divide-black/5">
                                    {(order.order_items ?? []).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between py-2 text-sm">
                                            <span className="text-black/70">{item.product_name} × {item.quantity}</span>
                                            <span className="font-semibold">{formatVnd(item.line_total)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 flex justify-between border-t border-black/10 pt-3 text-sm font-semibold">
                                    <span>Tổng cộng</span>
                                    <span>{formatVnd(order.total)}</span>
                                </div>
                            </article>
                        ))}
                        {orders.length === 0 && (
                            <p className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-black/45">Bạn chưa có đơn hàng nào.</p>
                        )}
                    </section>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Account;
