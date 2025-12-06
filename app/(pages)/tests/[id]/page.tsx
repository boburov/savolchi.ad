"use client";

import { useState } from "react";
import useAdminChannel from "@/hooks/useAdminChannel";
import { BadgeCheck, Plus, Trash2, CheckCircle, Circle } from "lucide-react";
import testService from "@/app/api/service/test.service";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Page = () => {
  const { admin } = useAdminChannel();
  const channel = admin?.channel;
  const params = useParams();

  const rawId = params.id;
  const subjectId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  const handleOptionChange = (idx: number, value: string) => {
    const updated = [...options];
    updated[idx].text = value;
    setOptions(updated);
  };

  const selectCorrect = (idx: number) => {
    setOptions((prev) => prev.map((o, i) => ({ ...o, isCorrect: i === idx })));
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, { text: "", isCorrect: false }]);
    } else {
      toast.info("Maksimum 6 ta variant qo'shish mumkin");
    }
  };

  const removeOption = (idx: number) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== idx);
      setOptions(updated);
    } else {
      toast.warning("Kamida 2 ta variant bo'lishi kerak");
    }
  };

  const handleSubmit = async () => {
    if (!subjectId) {
      toast.error("Subject topilmadi! URL noto'g'ri bo'lishi mumkin.");
      return;
    }

    if (!question.trim()) {
      toast.warning("Savol matnini yozing!");
      return;
    }

    const filledOptions = options.filter((o) => o.text.trim().length > 0);

    if (filledOptions.length < 2) {
      toast.warning("Kamida 2 ta to'ldirilgan variant bo'lishi kerak!");
      return;
    }

    const correctExists = options.some((o) => o.isCorrect);
    if (!correctExists) {
      toast.warning("Kamida 1 ta to'g'ri javob belgilang!");
      return;
    }

    const correctOption = options.find((o) => o.isCorrect);
    if (correctOption && correctOption.text.trim().length < 1) {
      toast.error("To'g'ri javob bo'sh variant bo'lishi mumkin emas!");
      return;
    }

    const payload = {
      subjectId,
      question: question.trim(),
      options: filledOptions,
    };

    setIsLoading(true);
    try {
      const res = await testService.createTest(payload);
      toast.success("✅ Test muvaffaqiyatli yaratildi!");

      // Formani tozalash
      setQuestion("");
      setOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);

      console.log("Yaratilgan test:", res);
    } catch (error: any) {
      toast.error(error.message || "Xatolik yuz berdi!");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setQuestion("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    toast.info("Forma tozalandi");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Test Yaratish
          </h1>
          <p className="text-gray-600 mt-2">
            Yangi test qo'shing va variantlarni belgilang
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Channel Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-1/3"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100">
              {/* Banner */}
              <div className="h-48 relative rounded-3xl">
                <img
                  src={channel?.banner || "/default-banner.jpg"}
                  alt={channel?.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />

                {/* Profile Picture */}
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <img
                      src={channel?.pfp || "/default-avatar.png"}
                      alt={channel?.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-2xl"
                    />
                    {admin?.isVerified && (
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white p-1 rounded-full">
                        <BadgeCheck size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Channel Info */}
              <div className="pt-16 px-6 pb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {channel?.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    @{admin?.name} • {channel?.createdAt?.slice(0, 10)}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 italic leading-relaxed">
                    {channel?.bio || "Kanal haqida tavsif yo'q"}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {channel?.subject?.length || 0}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      Bo'limlar
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-center text-white">
                    <div className="text-2xl font-bold">New</div>
                    <div className="text-sm opacity-90">Test yaratish</div>
                  </div>
                </div>

                {/* Subject ID */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-medium text-gray-600">
                    Bo'lim ID
                  </div>
                  <div className="text-lg font-mono font-bold text-purple-600 truncate">
                    {subjectId}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-purple-100">
              {/* Form Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Yangi Test
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Savol va variantlarni to'ldiring
                    </p>
                  </div>
                  <button
                    onClick={clearForm}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Tozalash
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl w-fit">
                  <button
                    onClick={() => setActiveTab("create")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === "create"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Asosiy
                  </button>
                  <button
                    onClick={() => setActiveTab("advanced")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === "advanced"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Qo'shimcha
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Savol matni
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all min-h-[120px] resize-none"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Savolni batafsil yozing..."
                  rows={3}
                />
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>Savol aniq va tushunarli bo'lishi kerak</span>
                  <span>{question.length}/100</span>
                </div>
              </div>

              {/* Options Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Variantlar
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <button
                    onClick={addOption}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    <Plus size={16} />
                    Variant qo'shish
                  </button>
                </div>

                <div className="space-y-3">
                  {options.map((opt, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        opt.isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                              opt.isCorrect
                                ? "border-green-300 focus:ring-green-200 focus:border-green-400"
                                : "border-gray-300 focus:ring-purple-200 focus:border-purple-400"
                            }`}
                            value={opt.text}
                            onChange={(e) =>
                              handleOptionChange(idx, e.target.value)
                            }
                            placeholder={`Variant ${idx + 1}`}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => selectCorrect(idx)}
                            className={`p-3 rounded-xl transition-all ${
                              opt.isCorrect
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            title="To'g'ri javob deb belgilash"
                          >
                            {opt.isCorrect ? (
                              <CheckCircle size={20} />
                            ) : (
                              <Circle size={20} />
                            )}
                          </button>

                          {options.length > 2 && (
                            <button
                              onClick={() => removeOption(idx)}
                              className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              title="Variantni o'chirish"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>

                      {opt.isCorrect && (
                        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
                          <CheckCircle size={16} />
                          <span>Bu variant to'g'ri javob deb belgilandi</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  <span className="text-red-500">*</span> Kamida 2 ta variant va
                  1 ta to'g'ri javob belgilashingiz kerak
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Yaratilmoqda...
                    </>
                  ) : (
                    <>
                      <Plus size={22} />
                      Testni Yaratish
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-gray-500 mt-4">
                  Test yaratilgach, uni bo'lim sahifasida ko'rishingiz mumkin
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  💡 Maslahat
                </h4>
                <p className="text-sm text-blue-700">
                  Savollar aniq, tushunarli va test mavzusiga mos bo'lishi kerak
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">
                  ✅ Tekshirish
                </h4>
                <p className="text-sm text-green-700">
                  Har bir testda kamida 1 ta to'g'ri javob bo'lishi shart
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                <h4 className="font-semibold text-purple-800 mb-2">
                  📊 Statistika
                </h4>
                <p className="text-sm text-purple-700">
                  {options.filter((o) => o.text.trim()).length} ta variant
                  to'ldirilgan
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
