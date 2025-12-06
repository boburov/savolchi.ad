"use client";

import subject from "@/app/api/service/subject";
import useAdminChannel from "@/hooks/useAdminChannel";
import {
  BadgeCheck,
  FileQuestion,
  Plus,
  X,
  Lock,
  Globe,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

interface Type {
  PRIVATE: string;
  PUBLIC: string;
}

interface Subject {
  id: string;
  name: string;
  type: "PRIVATE" | "PUBLIC";
  Test?: Array<any>;
}

export default function AdminDashboard() {
  const { admin } = useAdminChannel();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tests, setTests] = useState([]);

  // Editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    async function allTest() {
      const res = await subject.getByChannel(String(admin?.channel?.id));
      setSubjects(res);

      setTests(res);
    }
    allTest();
  }, [admin]);

  const createSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim())
      return toast.error("Bo'lim nomi bo'sh bo'lishi mumkin emas!");

    try {
      const res = await subject.create({
        type,
        name,
        channelId: String(admin?.channel?.id),
      });

      setSubjects((prev) => [...prev, res]);
      toast.success(
        `Bo'lim ${type === "PUBLIC" ? "ommaviy" : "maxfiy"} holatda yaratildi`
      );
      setIsOpen(false);
      setName("");
      setVisibility("PUBLIC");
    } catch (err: any) {
      toast.error(
        err.response?.status === 400
          ? "Bo'limlar limiti tugadi"
          : "Xatolik yuz berdi"
      );
    }
  };

  const updateSubject = async (id: string) => {
    if (!editingName.trim())
      return toast.error("Bo'lim nomi bo'sh bo'lishi mumkin emas!");

    try {
      await subject.update(id, { name: editingName });

      setSubjects((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, name: editingName } : sub))
      );

      toast.success("Bo'lim yangilandi");
      setEditingId(null);
      setEditingName("");
    } catch {
      toast.error("Yangilashda xatolik yuz berdi");
    }
  };

  const deleteSubject = async (id: string) => {
    const yes = confirm("Rostdan o'chirmoqchimisiz?");
    if (!yes) return;

    try {
      await subject.delete(id);
      setSubjects((prev) => prev.filter((sub) => sub.id !== id));
      toast.success("Bo'lim o'chirildi");
    } catch {
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  const filteredSubjects = subjects.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  // Obuna faol emas holati
  if (!admin?.subscription?.active) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-light text-gray-800 mb-4">
            Hurmatli,{" "}
            <span className="font-medium text-purple-600">{admin?.name}</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Obuna faol emas. Premiumga o'ting va ishlashni boshlang.
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
          >
            Obuna sotib olish
          </button>
        </div>
      </div>
    );
  }

  // Kanal yo'q holati
  if (!admin?.channel) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-800 mb-4">
            Kanal yarating,{" "}
            <span className="font-medium text-purple-600">{admin?.name}</span>
          </h1>
          <button
            onClick={() => router.push("/create/channel")}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition mt-6"
          >
            Yangi kanal yaratish
          </button>
        </div>
      </div>
    );
  }

  const channel = admin.channel;

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="container mx-auto px-6 py-12 flex gap-10">
        {/* Channel Card */}
        <div className="w-96">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="h-44 bg-gray-200 relative">
              <img
                src={channel.banner}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="px-8 pb-8 -mt-14 relative">
              <div className="flex justify-center">
                <img
                  src={channel.pfp}
                  alt={channel.name}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
                />
              </div>

              <div className="text-center mt-5">
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-2">
                  {channel.name}
                  {admin.isVerified && (
                    <BadgeCheck className="w-6 h-6 text-purple-600" />
                  )}
                </h1>
                <p className="text-purple-600 text-sm font-medium mt-1">
                  @{admin.name}
                </p>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {channel.bio}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 py-4 rounded-2xl">
                    <p className="text-2xl font-bold text-gray-800">
                      {tests.length}
                    </p>
                    <p className="text-xs text-gray-500">Testlar</p>
                  </div>
                  <div className="bg-purple-50 py-4 rounded-2xl">
                    <p className="text-2xl font-bold text-purple-700">
                      {admin.subscription.limit}
                    </p>
                    <p className="text-xs text-gray-600">Limit</p>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-500 text-center">
                  <span className="text-green-600 font-medium">Faol obuna</span>{" "}
                  • {admin.subscription.type}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">Bo'limlar</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2.5 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
              {subjects.length < admin.subscription.subjectLimit && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <Plus size={18} />
                  Bo'lim qo'shish
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                {/* EDIT MODE */}
                {editingId === sub.id ? (
                  <div className="p-6 bg-white rounded-3xl shadow space-y-3">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingName("");
                        }}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition"
                      >
                        Bekor
                      </button>

                      <button
                        onClick={() => updateSubject(sub.id)}
                        className="px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                      >
                        Saqlash
                      </button>
                    </div>
                  </div>
                ) : (
                  // NORMAL VIEW
                  <div className="relative group">
                    <Link
                      href={`/tests/${sub.id}`}
                      className="block p-10 bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
                    >
                      <div className="absolute top-4 right-4">
                        {sub.type === "PRIVATE" ? (
                          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                            <Lock size={12} />
                            Maxfiy
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                            <Globe size={12} />
                            Ommaviy
                          </div>
                        )}
                      </div>

                      <FileQuestion className="w-14 h-14 mx-auto text-gray-400 group-hover:text-purple-600 transition-colors" />
                      <p className="mt-4 text-center font-medium text-gray-800 group-hover:text-purple-700">
                        {sub.name}
                      </p>
                      <p className="text-center text-xs text-gray-500 mt-2">
                        {sub.Test?.length ?? 0} testlar
                      </p>
                    </Link>

                    {/* ACTION BUTTONS */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => {
                          setEditingId(sub.id);
                          setEditingName(sub.name);
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        title="Tahrirlash"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteSubject(sub.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        title="O'chirish"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Add New Subject Card */}
            {subjects.length < admin.subscription.subjectLimit && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className="p-10 bg-white rounded-3xl shadow border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer flex flex-col items-center justify-center transition-all"
              >
                <Plus className="w-14 h-14 text-gray-400" />
                <p className="mt-4 font-medium text-gray-600 text-sm">{`Yangi bo'lim`}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Create Subject Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Yangi bo'lim yaratish
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setName("");
                  setVisibility("PUBLIC");
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={createSubject} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bo'lim nomi
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Matematika, Ingliz tili..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none transition text-gray-800"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ko'rinish turi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibility("PUBLIC")}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      type === "PUBLIC"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Globe
                        className={`w-5 h-5 ${type === "PUBLIC" ? "text-green-600" : "text-green-400"}`}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-800">Ommaviy</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Hamma ko'rishi mumkin
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisibility("PRIVATE")}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      type === "PRIVATE"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Lock
                        className={`w-5 h-5 ${type === "PRIVATE" ? "text-amber-600" : "text-amber-400"}`}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-800">Maxfiy</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Faqat siz ko'rishingiz mumkin
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setName("");
                    setVisibility("PUBLIC");
                  }}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ToastContainer position="top-right" theme="light" autoClose={2500} />
    </div>
  );
}
