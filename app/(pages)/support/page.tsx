"use client";

import { Mail, Send, MessageSquare } from "lucide-react";

const SupportPage = () => {
  return (
    <div className="min-h-[77vh] flex flex-col items-center justify-start px-4 py-16 container border-x border-gray-300">
      <h1 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4 text-center">
        Support & Aloqa
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-xl">
        Agar sizga yordam kerak bo‘lsa yoki platformani qo‘llab-quvvatlamoqchi
        bo‘lsangiz, quyidagi kanallar orqali biz bilan bog‘lanishingiz mumkin.
        Sizning murojaatlaringizni tez va samarali ko‘rib chiqamiz.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 w-full max-w-3xl">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
          <Mail className="text-purple-700 mb-3" size={36} />
          <h3 className="font-semibold text-lg mb-1">Email orqali</h3>
          <p className="text-gray-500 text-sm mb-3">boburovdev@gmail.com</p>
          <a
            href="mailto:savolchi.support@example.com"
            className="bg-purple-700 text-white px-6 py-2 rounded-lg text-sm hover:bg-purple-800 transition flex items-center gap-2"
          >
            <Send size={16} /> Murojaat yuborish
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
          <MessageSquare className="text-blue-500 mb-3" size={36} />
          <h3 className="font-semibold text-lg mb-1">Telegram orqali</h3>
          <p className="text-gray-500 text-sm mb-3">@rovixwb</p>
          <a
            href="https://t.me/rovixwb"
            target="_blank"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600 transition flex items-center gap-2"
          >
            Chatga o'tish
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
