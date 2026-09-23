"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email.trim(),
                password: formData.password,
            });
            if (error) {
                toast.error(error.message === 'Invalid login credentials'
                    ? 'Email hoặc mật khẩu không đúng.'
                    : error.message);
                return;
            }
            toast.success('Chào mừng bạn quay lại!');
            const next = searchParams.get('next') || '/account';
            router.push(next);
            router.refresh();
        } catch {
            toast.error('Không thể đăng nhập. Vui lòng thử lại.');
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
                            Chào mừng trở lại
                        </h1>
                        <p className="text-gray-600 font-body">
                            Đăng nhập để tiếp tục hành trình làm đẹp cùng Melalogy
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        placeholder="Nhập mật khẩu"
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

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-[#b31324] to-[#850c18] text-white py-3 rounded-lg font-button font-semibold hover:shadow-lg hover:shadow-[#b31324]/30 transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group disabled:opacity-60 disabled:pointer-events-none"
                            >
                                <span className="relative z-10">{isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#850c18] to-[#b31324] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 font-body">
                                Chưa có tài khoản?{' '}
                                <Link
                                    href="/signup"
                                    className="text-[#b31324] hover:text-[#d01629] font-semibold transition-colors"
                                >
                                    Đăng ký
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

export default Login;
