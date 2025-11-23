"use client";

import useAdminChannel from "@/hooks/useAdminChannel";
import { Plus, Edit3, Users, FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { admin } = useAdminChannel();
  const router = useRouter();

  console.log("Admin ma'lumotlari:", admin);

  // 1) Obuna yo'q
  if (!admin?.subscription) {
    return (
      <section className="w-full min-h-[75vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="text-purple-600" size={32} strokeWidth={2.5} />
          </div>
          <h2 className="font-bold text-2xl md:text-3xl mb-4 text-gray-800">
            Obuna talab qilinadi
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Avval obuna sotib oling, shundan keyin kanal yaratishingiz mumkin.
            Obuna orqali testlar yaratish va boshqarish imkoniyatlaridan
            foydalaning.
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center gap-3 px-6 py-3.5 transition-all duration-200 shadow-md hover:shadow-lg mx-auto"
          >
            <Plus strokeWidth={3} size={20} />
            Obuna Sotib Olish
          </button>
        </div>
      </section>
    );
  }

  // 2) Obuna bor, kanal yo'q
  if (admin.subscription && !admin?.channel) {
    return (
      <section className="w-full min-h-[75vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Edit3 className="text-blue-600" size={32} strokeWidth={2.5} />
          </div>
          <h2 className="font-bold text-2xl md:text-3xl mb-4 text-gray-800">
            Kanal yaratish
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Sizda obuna mavjud. Endi o'z kanalingizni yarating va testlar bilan
            sharing boshlasangiz bo'ladi.
          </p>
          <button
            onClick={() => router.push("/create/channel")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-3 px-6 py-3.5 transition-all duration-200 shadow-md hover:shadow-lg mx-auto"
          >
            <Plus strokeWidth={3} size={20} />
            Kanal Yaratish
          </button>
        </div>
      </section>
    );
  }

  // 3) Obuna va kanal mavjud
  const channel = admin.channel;
  const subscription = admin.subscription;

  // Sana formatlash
  const endDate = subscription?.endDate
    ? new Date(subscription.endDate).toLocaleDateString("uz-UZ")
    : "Noma'lum";

  return (
    <section className="container max-w-4xl mx-auto py-8 px-4">
      {/* Banner */}
      <div className="relative rounded-2xl shadow-lg mb-6">
        {channel?.banner ? (
          <img
            src={channel.banner}
            alt="Kanal banneri"
            className="w-full h-48 md:h-56 object-cover"
          />
        ) : (
          <div className="w-full h-48 md:h-56 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              Kanal Banneri
            </span>
          </div>
        )}

        {/* Profil rasmi */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={channel?.pfp || ""}
              alt={channel?.name}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl bg-white"
            />
            <button
              onClick={() => router.push("/edit/channel")}
              className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full shadow-md hover:bg-purple-700 transition-colors"
            >
              <Edit3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Kanal ma'lumotlari */}
      <div className="mt-20 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{channel?.name}</h1>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {channel?.bio || "Kanal haqida tavsif kiritilmagan"}
        </p>

        {/* Harakatlar */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            onClick={() => router.push("/create/test")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center gap-2 px-5 py-2.5 transition-colors"
          >
            <Plus size={18} /> Test Qo'shish
          </button>
          <button
            onClick={() => router.push("/edit/channel")}
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-xl flex items-center gap-2 px-5 py-2.5 transition-colors"
          >
            <Edit3 size={18} /> Kanalni Tahrirlash
          </button>
        </div>
      </div>

      {/* Statistikalar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {channel?.subjects.length || 0}
          </p>
          <p className="text-gray-600 text-sm">Joylangan testlar</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {channel?.subjects.length || 0}
          </p>
          <p className="text-gray-600 text-sm">Obunachilar</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800 capitalize">
            {subscription.type}
          </p>
          <p className="text-gray-600 text-sm">Obuna turi</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
          <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="text-amber-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {admin.subscription.expiresAt.slice(0, 10)}
          </p>
          <p className="text-gray-600 text-sm">Obuna tugashi</p>
        </div>
      </div>
    </section>
  );
};

export default Page;
