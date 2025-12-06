"use client";

import useAdminChannel from "@/hooks/useAdminChannel";
import {
  Plus,
  Edit3,
  Users,
  FileText,
  Calendar,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { admin } = useAdminChannel();
  const router = useRouter();

  if (!admin?.subscription) {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-linear-to-br from-purple-50 to-white border border-purple-100 flex items-center justify-center shadow-sm">
              <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center">
                <Plus className="text-purple-600" size={28} strokeWidth={2} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-2xl text-gray-900">
              Obuna talab qilinadi
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              Testlar yaratish va boshqarish imkoniyatlaridan foydalanish uchun
              avval obuna sotib oling.
            </p>
          </div>
          <button
            onClick={() => router.push("/pricing")}
            className="group w-full max-w-xs mx-auto px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus strokeWidth={2.5} size={18} />
            <span className="font-medium">Obuna sotib olish</span>
            <ChevronRight
              size={16}
              className="opacity-80 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>
    );
  }

  if (admin.subscription && !admin?.channel) {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-linear-to-br from-purple-50 to-white border border-purple-100 flex items-center justify-center shadow-sm">
              <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center">
                <Edit3 className="text-purple-600" size={28} strokeWidth={2} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-2xl text-gray-900">
              Kanal yaratish
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              Obunangiz faollashtirildi. Endi o'z kanalingizni yarating va
              testlar bilan sharing boshlasangiz bo'ladi.
            </p>
          </div>
          <button
            onClick={() => router.push("/create/channel")}
            className="group w-full max-w-xs mx-auto px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus strokeWidth={2.5} size={18} />
            <span className="font-medium">Kanal yaratish</span>
            <ChevronRight
              size={16}
              className="opacity-80 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>
    );
  }

  const channel = admin.channel;
  const subscription = admin.subscription;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Banner Section */}
      <div className="relative rounded-2xl mb-16 bg-linear-to-br from-purple-50 to-white border border-purple-100">
        {channel?.banner ? (
          <img
            src={channel.banner}
            alt="Kanal banneri"
            className="w-full h-48 md:h-56 object-cover rounded-3xl"
          />
        ) : (
          <div className="w-full h-48 md:h-56 bg-linear-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto">
                <Edit3 className="text-purple-600" size={20} />
              </div>
              <span className="text-sm text-purple-600 font-medium">
                Kanal Banneri
              </span>
            </div>
          </div>
        )}
        {/* Profile Image */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <img
              src={channel?.pfp || ""}
              alt={channel?.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg bg-white object-cover"
            />
            <button
              onClick={() => router.push("/settings")}
              className="absolute -bottom-1 -right-1 bg-white text-purple-600 p-2 rounded-full shadow-md border border-purple-100 hover:bg-purple-50 transition-colors"
            >
              <Edit3 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Channel Info */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <h1 className="text-3xl font-semibold text-gray-900">
            {channel?.name}
          </h1>
          <button
            onClick={() => router.push("/settings")}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Edit3 size={16} />
          </button>
        </div>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
          {channel?.bio || "Kanal haqida tavsif kiritilmagan"}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => router.push("/tests/")}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center gap-2.5 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus size={16} />
          Test Qo'shish
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl flex items-center gap-2.5 text-sm font-medium transition-all duration-200 border border-gray-200 shadow-sm hover:shadow"
        >
          <Edit3 size={16} />
          Kanalni tahrirlash
        </button>
        <button
          onClick={() => router.push(`/channel/${channel?.id}`)}
          className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl flex items-center gap-2.5 text-sm font-medium transition-all duration-200 border border-gray-200 shadow-sm hover:shadow"
        >
          <ExternalLink size={16} />
          Kanalni ko'rish
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* Testlar */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-purple-100 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <FileText className="text-purple-600" size={18} />
            </div>
            <span className="text-xs text-gray-400">Testlar</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">
            {channel?.subject.length || 0}
          </p>
          <p className="text-xs text-gray-500">Joylangan testlar soni</p>
        </div>

        {/* Obuna turi */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-purple-100 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <FileText className="text-purple-600" size={18} />
            </div>
            <span className="text-xs text-gray-400">Obuna</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {subscription.type}
            </p>
            <p className="text-xs text-gray-500">Amaldagi obuna turi</p>
          </div>
        </div>

        {/* Obuna tugashi */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-purple-100 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Calendar className="text-purple-600" size={18} />
            </div>
            <span className="text-xs text-gray-400">Muddati</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">
              {admin.subscription.expiresAt.slice(0, 10)}
            </p>
            <p className="text-xs text-gray-500">Obuna tugash sanasi</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
