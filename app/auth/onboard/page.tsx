"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "@/app/api/service/auth.service";

const OnboardPage = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[idx] = val;
      setCode(newCode);

      if (val && idx < 5) {
        const nextInput = document.getElementById(`code-${idx + 1}`);
        nextInput?.focus();
      }

      if (!val && idx > 0) {
        const prevInput = document.getElementById(`code-${idx - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode.length < 6) {
      toast.error("Iltimos 6 xonali kod kiriting ❌");
      return;
    }
    setLoading(true);

    try {
      await authService.verify(enteredCode);
      toast.success("Kod to‘g‘ri ✅");
      localStorage.removeItem("onboardEmail");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Kod noto‘g‘ri ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-purple-800 mb-4">
          Ro'yxatdan o'tishni yakunlash
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Sizga yuborilgan 6 xonali kodni kiriting
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-between gap-2 mb-6"
        >
          {code.map((val, idx) => (
            <input
              key={idx}
              id={`code-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          ))}
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-800 hover:bg-purple-900 text-white py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
        </button>
      </div>
    </div>
  );
};

export default OnboardPage;
