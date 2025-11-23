"use client";

import { useState } from "react";
import useAdminChannel from "@/hooks/useAdminChannel";
import { BadgeCheck } from "lucide-react";
import testService from "@/app/api/service/test.service";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleOptionChange = (idx: number, value: string) => {
    const updated = [...options];
    updated[idx].text = value;
    setOptions(updated);
  };

  const selectCorrect = (idx: number) => {
    setOptions((prev) => prev.map((o, i) => ({ ...o, isCorrect: i === idx })));
  };

  const handleSubmit = async () => {
    if (!subjectId) {
      toast.error("Subject topilmadi! URL noto‘g‘ri bo‘lishi mumkin.");
      return;
    }

    if (!question.trim()) {
      toast.warning("Savol matnini yozing!");
      return;
    }

    const filledOptions = options.filter((o) => o.text.trim().length > 1);
    if (filledOptions.length < 2) {
      toast.warning("Kamida 2 ta to‘ldirilgan variant bo‘lishi kerak!");
      return;
    }

    const correctExists = options.some((o) => o.isCorrect);
    if (!correctExists) {
      toast.warning("Kamida 1 ta to‘g‘ri javob belgilang!");
      return;
    }

    const correctOption = options.find((o) => o.isCorrect);
    if (correctOption && correctOption.text.trim().length < 1) {
      toast.error("To‘g‘ri javob bo‘sh variant bo‘lishi mumkin emas!");
      return;
    }

    const payload = { subjectId, question, options };

    try {
      const res = await testService.createTest(payload);
      toast.success("Test muvaffaqiyatli yaratildi!");
      console.log(res);
    } catch (error: any) {
      toast.error(error.message || "Xatolik yuz berdi!");
    }
  };

  return (
    <section className="min-h-[80vh] container flex justify-between py-8 gap-10 relative">
      <ToastContainer position="top-center" theme="colored" />

      {/* Left Channel Card */}
      <section className="w-96 bg-gradient-to-b from-purple-300 to-purple-400 h-[78vh] rounded-3xl overflow-hidden relative shadow-xl text-white">
        <img
          src={channel?.banner}
          alt={channel?.name}
          className="h-56 object-cover w-full opacity-80 rounded-b-3xl mb-10"
        />

        <img
          src={channel?.pfp}
          alt={channel?.name}
          className="w-24 h-24 rounded-2xl object-cover absolute top-28 left-6 border-4 border-purple-200 shadow-lg"
        />

        <section className="p-6 mt-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 leading-2 drop-shadow">
            {channel?.name} {admin?.is_verifyed ? <BadgeCheck /> : ""}
          </h1>

          <span className="text-purple-100 text-xs mb-2 inline-block opacity-90">
            {channel?.createdAt?.slice(0, 10)}
          </span>

          <div className="w-full h-[1px] bg-white/40 my-3" />

          <p className="text-sm italic text-purple-50 mb-5 leading-5">
            {channel?.bio}
          </p>

          <span className="font-semibold text-white drop-shadow">
            Subjects: {channel?.subjects?.length}
          </span>
        </section>
      </section>

      {/* Right Form */}
      <section className="flex-1 bg-white rounded-3xl p-8 shadow-lg border border-purple-100">
        <h2 className="text-2xl font-semibold mb-6 text-purple-600">
          Test yaratish
        </h2>

        <div className="text-sm font-medium text-purple-500 mb-3">
          Subject ID: <span className="font-bold">{subjectId}</span>
        </div>

        <label className="font-medium text-sm text-gray-700">Savol matni</label>

        <input
          className="w-full p-3 border-2 border-purple-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Savolni kiriting..."
        />

        <h3 className="font-semibold mb-3 text-gray-800 text-lg">Variantlar</h3>

        {options.map((opt, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 mb-3 bg-purple-50 p-3 rounded-xl border border-purple-200"
          >
            <input
              className="flex-1 p-2 border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              value={opt.text}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Variant ${idx + 1}`}
            />
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow ${
                opt.isCorrect
                  ? "bg-purple-600 text-white shadow-purple-300"
                  : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100"
              }`}
              onClick={() => selectCorrect(idx)}
            >
              To‘g‘ri
            </button>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-full mt-6 font-semibold text-base shadow-lg hover:opacity-90 transition-all"
        >
          Testni yaratish
        </button>
      </section>
    </section>
  );
};

export default Page;
