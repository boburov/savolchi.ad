"use client";

import subject from "@/app/api/service/subject";
import useAdminChannel from "@/hooks/useAdminChannel";
import { BadgeCheck, Cross, FileQuestion, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const page = () => {
  const { admin } = useAdminChannel();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    setSubjects(admin?.channel?.subjects ?? []);
  }, [admin]);

  const createSubject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Bo'lim nomi bo'sh bo'lishi mumkin emas!");
      return;
    }

    const data = {
      name,
      channelId: String(admin?.channel?.id),
    };

    try {
      const res = await subject.createSubject(data);

      toast.success("Bo'lim muvaffaqiyatli yaratildi!");

      // yangi subjectni qo‘shish
      setSubjects((prev) => [...prev, res.data]);

      // modalni yopish va inputni tozalash
      setIsOpen(false);
      setName("");
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error("Siz limitga yetdingiz. Iltimos obunani oshiring!");
      } else {
        toast.error("Xatolik ro‘y berdi. Qaytadan urinib ko‘ring.");
      }
    }
  };

  if (admin?.subscription) {
    if (admin?.channel == null) {
      return (
        <div className="container min-h-[75vh] flex flex-col gap-5 items-center justify-center">
          <h1 className="text-3xl text-gray-800 text-center montserrat-regular w-2/3">
            Hurmatli{" "}
            <span className="font-bold uppercase text-purple-500">
              {admin?.name}
            </span>{" "}
            sizda hozircha Kanal mavjud emas. Iltimos kanal yarating.
          </h1>

          <button
            onClick={() => router.push("/create/channel")}
            className="flex gap-3 items-center px-5 py-2.5 bg-purple-700 rounded-full text-white"
          >
            <Plus /> Kanal yaratish
          </button>
        </div>
      );
    }

    const channel = admin.channel;

    return (
      <section className="min-h-[75vh] container flex justify-between py-5 gap-10 relative">
        {/* Left Channel Card */}
        <section className="w-96 bg-purple-100 h-[75vh] rounded-2xl overflow-hidden relative">
          <img
            src={channel.banner}
            alt={channel.name}
            className="h-40 object-cover w-full rounded-b-2xl mb-10"
          />

          <img
            src={channel.pfp}
            alt={channel.name}
            className="w-20 h-20 rounded-full object-cover absolute top-28 left-10 border-4 border-purple-200"
          />

          <section className="p-5">
            <h1 className="text-xl font-bold flex items-center gap-1 text-gray-800 leading-2">
              {channel.name} {admin.is_verifyed ? <BadgeCheck /> : ""}
            </h1>

            <span className="text-gray-500 text-xs mb-2 inline-block">
              {channel.createdAt.slice(0, 10)}
            </span>

            <hr className="mb-3 text-gray-400" />

            <p className="text-sm italic text-gray-700 mb-5">{channel.bio}</p>

            <span className="font-semibold">Joylangan testlar: 356</span>
            <br />
            <span className="font-semibold">
              Limit: {admin.subscription.limit}
            </span>
          </section>
        </section>

        {/* Modal */}
        {isOpen && (
          <section className="w-full h-full absolute bg-black/20 top-0 left-0 z-10 flex items-center justify-center">
            <div className="bg-white w-96 p-5 rounded-2xl shadow-lg relative">
              <Cross
                onClick={() => setIsOpen(false)}
                className="rotate-45 absolute -top-10 -right-5 text-red-700 z-20 cursor-pointer"
              />

              <h1 className="text-xl font-bold mb-5">Bo'lim yaratish</h1>

              <form className="flex flex-col gap-4" onSubmit={createSubject}>
                <input
                  type="text"
                  placeholder="Bo'lim nomi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Bekor qilish
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Yaratish
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Right Section */}
        <section className="flex flex-wrap w-full gap-7 text-gray-700 h-72">
          {subjects.map((subject) => (
            <Link
              href={`tests/${subject.id}`}
              key={subject.id}
              className="w-40 bg-purple-100 hover:bg-purple-300 transition-all duration-200 cursor-pointer h-40 flex flex-col items-center justify-center rounded-2xl shadow-sm hover:shadow-lg"
            >
              <FileQuestion size={50} strokeWidth={2} />
              <p className="mt-2 font-semibold text-sm">{subject.name}</p>
            </Link>
          ))}

          <ToastContainer />

          {/* Create Button */}
          <div
            onClick={() => setIsOpen(true)}
            className="bg-purple-300 hover:bg-purple-400 transition-all w-40 h-40 flex flex-col items-center justify-center rounded-2xl cursor-pointer"
          >
            <Plus size={50} strokeWidth={3} />
            <p className="mt-2 font-semibold text-sm">Bo'lim yaratish</p>
          </div>
        </section>
      </section>
    );
  }

  // No subscription
  return (
    <div className="container min-h-[75vh] flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl text-gray-800 text-center montserrat-regular w-2/3">
        Hurmatli{" "}
        <span className="font-bold uppercase text-purple-500">
          {admin?.name}
        </span>{" "}
        sizda hozircha obuna mavjud emas. Iltimos obuna sotib oling.
      </h1>

      <button
        onClick={() => router.push("/pricing")}
        className="flex gap-3 items-center px-5 py-2.5 bg-purple-700 rounded-full text-white"
      >
        <Plus /> Sotib olish
      </button>
    </div>
  );
};

export default page;
