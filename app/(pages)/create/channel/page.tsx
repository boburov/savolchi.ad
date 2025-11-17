"use client";
import channel from "@/app/api/service/channel.service";
import useAdminChannel from "@/hooks/useAdminChannel";
import { Plus } from "lucide-react";
import { useState, ChangeEvent } from "react";

type FormDataType = {
  name: string;
  bio: string;
  profileImage: File | null;
  coverImage: File | null;
};

const Page = () => {
  const { admin } = useAdminChannel();
  console.log(admin?.id);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    bio: "",
    profileImage: null,
    coverImage: null,
  });

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "profileImage" | "coverImage"
  ) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Faqat PNG, JPG yoki WEBP formatidagi fayllar ruxsat etiladi!");
      return;
    }

    const maxSize = type === "profileImage" ? 5 * 1024 * 1024 : 8 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(
        `Tanlangan fayl juda katta! Maksimal ${
          type === "profileImage" ? "5MB" : "8MB"
        } ruxsat etiladi.`
      );
      return;
    }

    setFormData({ ...formData, [type]: file });
  };

  const createChannel = async () => {
    if (!formData.name || !formData.bio) {
      alert("Iltimos, nom, bio va adminId to'ldiring!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("adminId", admin?.id);
    if (formData.profileImage) data.append("pfp", formData.profileImage); // <-- backend nomi bilan mos
    if (formData.coverImage) data.append("banner", formData.coverImage); // <-- backend nomi bilan mos

    try {
      const res = await channel.create_chanel(data);
      alert("Kanal muvaffaqiyatli yaratildi!");
      console.log(res);
      setFormData({
        name: "",
        bio: "",
        profileImage: null,
        coverImage: null,
      });
    } catch (error) {
      console.error(error);
      alert("Kanal yaratishda xatolik yuz berdi!");
    }
  };

  return (
    <div className="min-h-[76.5vh] flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-lg flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Kanal Yaratish
        </h1>

        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Kanal Nomi ..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-purple-300 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          />

          <textarea
            placeholder="Kanal Biosi ..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="border border-purple-300 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition resize-none h-24"
          />

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl py-5 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition">
            <span className="text-purple-500">
              {formData.profileImage
                ? formData.profileImage.name
                : "Profil Rasmni Tanlang"}
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={(e) => handleFileChange(e, "profileImage")}
            />
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl py-5 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition">
            <span className="text-purple-500">
              {formData.coverImage
                ? formData.coverImage.name
                : "Cover Rasmni Tanlang"}
            </span>

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={(e) => handleFileChange(e, "coverImage")}
            />
          </label>

          <button
            type="button"
            onClick={createChannel}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold rounded-2xl py-3 hover:bg-purple-700 transition"
          >
            <Plus /> Yaratish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
