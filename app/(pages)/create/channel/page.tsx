"use client";

import channel from "@/app/api/service/channel.service";
import useAdminChannel from "@/hooks/useAdminChannel";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";

type FormDataType = {
  name: string;
  bio: string;
  profileImage: File | null;
  coverImage: File | null;
};

const Page = () => {
  const { admin } = useAdminChannel();
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    bio: "",
    profileImage: null,
    coverImage: null,
  });

  useEffect(() => {
    if (admin?.subscription === null) {
      router.push("/pricing");
    }
  }, []);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "profileImage" | "coverImage"
  ) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Faqat PNG, JPG, JPEG yoki WEBP formatiga ruxsat!");
      return;
    }

    const maxSize = type === "profileImage" ? 5 * 1024 * 1024 : 8 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        type === "profileImage"
          ? "Profil rasm maksimal 5MB bo‘lishi kerak!"
          : "Cover rasm maksimal 8MB bo‘lishi kerak!"
      );
      return;
    }

    setFormData((prev) => ({ ...prev, [type]: file }));
  };

  const createChannel = async () => {
    if (!formData.name.trim()) {
      toast.error("Kanal nomi bo‘sh bo‘lmasligi kerak!");
      return;
    }

    if (formData.bio.trim().length < 30) {
      toast.error("Bio minimal 30 ta belgidan iborat bo‘lishi kerak!");
      return;
    }

    if (!admin?.id) {
      toast.error("Admin ID topilmadi!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("adminId", admin.id.toString());
    if (formData.profileImage) data.append("pfp", formData.profileImage);
    if (formData.coverImage) data.append("banner", formData.coverImage);

    try {
      await channel.create_chanel(data, admin.id.toString());

      toast.success("Kanal muvaffaqiyatli yaratildi!");

      router.push("/profile");

      setFormData({
        name: "",
        bio: "",
        profileImage: null,
        coverImage: null,
      });
    } catch (error) {
      toast.error("Kanal yaratishda xatolik!");
      console.log(error);
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
            placeholder="Kanal Biosi (kamida 30 ta belgi)..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="border border-purple-300 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition resize-none h-24"
          />

          {/* PROFILE IMAGE */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl py-5 cursor-pointer transition hover:border-purple-500 hover:bg-purple-50">
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

          {/* COVER IMAGE */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl py-5 cursor-pointer transition hover:border-purple-500 hover:bg-purple-50">
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
