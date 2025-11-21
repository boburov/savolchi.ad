"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "@/public/savolchi.svg";
import authService from "@/app/api/service/auth.service";

const AuthPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password);
        toast.success("Kirish muvaffaqiyatli ✅");
        router.push("/dashboard");
      } else {
        await authService.register(formData);
        localStorage.setItem("onboardEmail", formData.email);
        toast.success("Ro'yxatdan o'tish muvaffaqiyatli 🎉");
        router.push("/auth/onboard");
      }
      setFormData({ name: "", email: "", password: "" });
    } catch (err: any) {
      if (isLogin) {
        toast.error("Email yoki parol noto'g'ri ❌");
      } else {
        if (err.response?.status === 409) {
          toast.error("Bu email allaqachon band ❌");
        } else {
          toast.error("Ro'yxatdan o'tishda xatolik yuz berdi ⚠️");
          console.log(err);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4 py-8">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-2xl ubuntu-bold gap-2 text-purple-800 mb-1"
          >
            <Image src={logo} alt="Savolchi" width={32} height={32} /> Savolchi
          </Link>
          <p className="text-sm text-gray-600">
            Testlar platformasiga xush kelibsiz
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? "bg-purple-800 text-white shadow-sm"
                  : "text-gray-600 hover:text-purple-800"
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? "bg-purple-800 text-white shadow-sm"
                  : "text-gray-600 hover:text-purple-800"
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                  <BookOpen size={14} /> Foydalanuvchi nomi
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Username"
                    required={!isLogin}
                  />
                  <BookOpen
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <Mail size={14} /> Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="email@example.com"
                  required
                />
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <Lock size={14} /> Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Parol"
                  required
                />
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-800"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-xs text-purple-800 hover:text-purple-700"
                >
                  Parolni unutdingizmi?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-800 hover:bg-purple-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            {isLogin ? "Hisobingiz yo'qmi?" : "Allaqachon hisobingiz bormi?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-800 hover:text-purple-700 font-medium ml-1"
            >
              {isLogin ? "Ro'yxatdan o'tish" : "Kirish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
