"use client";

import { useEffect, useState } from "react";
import channel from "@/app/api/service/channel.service";
import { useRouter } from "next/navigation";
import useAdminChannel from "@/hooks/useAdminChannel";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Edit3,
  Loader2,
  CheckCircle,
  ArrowLeft,
  User,
  Layout,
} from "lucide-react";

const UpdateChannelPage = () => {
  useAuth();
  const { admin, loading: adminLoading } = useAdminChannel();
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [pfp, setPfp] = useState<File | null>(null);
  const [pfpPreview, setPfpPreview] = useState<string>("");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const channelId = admin?.channel?.id;

  useEffect(() => {
    if (!channelId) return;
    const load = async () => {
      try {
        const data = await channel.get_chanel_by_id(String(channelId));
        setName(data.name || "");
        setDesc(data.description || "");
        // Note: If your API returns image URLs, you can set previews here
      } catch (err) {
        setErrMsg("Kanal maʼlumotlarini olishda xatolik bo‘ldi.");
      }
    };
    load();
  }, [channelId]);

  const handleFileChange = (file: File | null, type: "pfp" | "banner") => {
    if (file) {
      if (type === "pfp") {
        setPfp(file);
        setPfpPreview(URL.createObjectURL(file));
      } else {
        setBanner(file);
        setBannerPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErrMsg("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);

      if (pfp) formData.append("pfp", pfp);
      if (banner) formData.append("banner", banner);

      await channel.update_channel(String(channelId), formData);

      setSuccess("Kanal muvaffaqiyatli yangilandi.");
      setTimeout(() => router.push("/chanel"), 3000);
    } catch (err) {
      setErrMsg("Yangilashda xatolik bo‘ldi. Keyinroq urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  if (adminLoading || !channelId) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-purple-600"
        >
          <Loader2 size={48} />
        </motion.div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Orqaga
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-white">
              <Edit3 size={28} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Kanalni Yangilash
            </h1>
          </div>
          <p className="text-gray-600">
            Kanal profilingizni yangilang va shakllantiring
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
        >
          {/* Status Messages */}
          {errMsg && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
            >
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle size={20} />
              </div>
              <span>{errMsg}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle size={20} />
              </div>
              <span>{success}</span>
            </motion.div>
          )}

          {/* Banner Upload */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <Layout size={20} className="text-purple-600" />
              Banner Rasmi
            </label>
            <div className="relative group">
              <div
                className={`h-48 rounded-xl border-2 border-dashed ${bannerPreview ? "border-transparent" : "border-purple-200"} overflow-hidden bg-gradient-to-r from-purple-50 to-white transition-all duration-300`}
              >
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <ImageIcon size={48} className="text-purple-300 mb-3" />
                    <p className="text-gray-400">Banner rasmini yuklang</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="p-3 bg-white/90 rounded-full">
                    <Upload className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e.target.files?.[0] || null, "banner")
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <User size={20} className="text-purple-600" />
              Profil Rasmi
            </label>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div
                  className={`w-24 h-24 rounded-full border-2 ${pfpPreview ? "border-purple-300" : "border-dashed border-purple-200"} overflow-hidden bg-gradient-to-r from-purple-50 to-white transition-all duration-300`}
                >
                  {pfpPreview ? (
                    <img
                      src={pfpPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={32} className="text-purple-300" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100">
                  <div className="p-2 bg-white/90 rounded-full">
                    <Upload className="text-purple-600" size={16} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null, "pfp")
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-500">
                Profil rasmigiz kanal identifikatori sifatida ishlatiladi
              </p>
            </div>
          </div>

          {/* Channel Name */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Kanal Nomi
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pl-12 bg-purple-50 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Mening Ajoyib Kanali"
              />
              <Edit3
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={20}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Tavsif
            </label>
            <textarea
              className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none resize-none min-h-[120px]"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Kanal haqida qisqacha maʼlumot..."
            />
            <p className="text-sm text-gray-500 mt-2 text-right">
              {desc.length}/500
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl"
            } text-white`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Yangilanmoqda...
              </>
            ) : (
              <>
                <CheckCircle size={24} />
                Kanalni Yangilash
              </>
            )}
          </motion.button>

          {/* Help Text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Yangilangan maʼlumotlar 24 soat ichida butun platformada koʻrinadi
          </p>
        </motion.div>

        {/* Preview Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-white rounded-full border border-purple-200">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">
              Real vaqtda koʻrib chiqish rejimi
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateChannelPage;
