"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

const Signup = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        setIsSubmitting(true);
        try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signUp({
                email: formData.email.trim(),
                password: formData.password,
                options: {
                    data: { full_name: formData.name.trim() },
                },
            });
            if (error) {
                toast.error(error.message === 'User already registered'
                    ? 'Email này đã được đăng ký.'
                    : error.message);
                return;
            }
            if (!data.session) {
                toast.success('Vui lòng kiểm tra email để xác nhận tài khoản.');
                router.push('/login');
                return;
            }
            toast.success('Tạo tài khoản thành công!');
            router.push('/account');
            router.refresh();
        } catch {
            toast.error('Không thể tạo tài khoản. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-start justify-center px-4 pt-24 pb-12 bg-gradient-to-br from-pink-50 via-white to-rose-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
                            Tham gia Melalogy
                        </h1>
                        <p className="text-gray-600 font-body">
                            Tạo tài khoản để bắt đầu hành trình chăm sóc da của bạn
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-body">
                                    Họ và tên
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b31324] focus:border-transparent transition-all duration-200 font-body"
                                        placeholder="Nhập họ và tên"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-body">
                                    Địa chỉ email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b31324] focus:border-transparent transition-all duration-200 font-body"
                                        placeholder="Nhập email của bạn"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-body">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b31324] focus:border-transparent transition-all duration-200 font-body"
                                        placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="mt-1 w-4 h-4 text-[#b31324] border-gray-300 rounded focus:ring-[#b31324]"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 font-body">
                                    Tôi đồng ý với{' '}
                                    <Link href="/terms" className="text-[#b31324] hover:text-[#d01629] transition-colors">
                                        Điều khoản dịch vụ
                                    </Link>{' '}
                                    và{' '}
                                    <Link href="/privacy" className="text-[#b31324] hover:text-[#d01629] transition-colors">
                                        Chính sách bảo mật
                                    </Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-[#b31324] to-[#850c18] text-white py-3 rounded-lg font-button font-semibold hover:shadow-lg hover:shadow-[#b31324]/30 transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group disabled:opacity-60 disabled:pointer-events-none"
                            >
                                <span className="relative z-10">{isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#850c18] to-[#b31324] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 font-body">
                                Đã có tài khoản?{' '}
                                <Link
                                    href="/login"
                                    className="text-[#b31324] hover:text-[#d01629] font-semibold transition-colors"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Signup;
