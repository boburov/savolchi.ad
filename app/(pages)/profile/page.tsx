"use client";

import useAdminChannel from "@/hooks/useAdminChannel";
import Link from "next/link";

const Page = () => {
  const { admin } = useAdminChannel();

  const channel = admin?.channel;

  if (!channel) {
    return (
      <div className="flex h-[75vh] flex-col gap-5 items-center justify-center bg-gray-50 text-gray-700 text-lg font-semibold">
        Sizda kanal mavjud emas 😔
        <Link href={"/create/channel"} className="px-5 py-2.5 bg-purple-700 rounded-xl text-white">Kanal Yaratish</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col container border-x border-gray-300">
      <div className="relative h-56 md:h-72 w-full">
        <img
          src={channel.banner}
          alt="Channel Banner"
          className="w-full h-full object-cover shadow-md rounded-b-2xl"
        />

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={channel.pfp}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>
      </div>

      <div className="mt-24 flex flex-col items-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">{channel.name}</h1>
        <p className="text-gray-600 text-sm max-w-lg">
          {channel.bio} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tempore illo quibusdam quo hic beatae blanditiis aspernatur fuga.
          Suscipit, voluptatibus itaque?
        </p>
      </div>

      <div className="mt-12 px-6 md:px-12 lg:px-24 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Admin ma’lumotlari
            </h2>
            <p className="text-gray-600 text-sm">Email: {admin?.email}</p>
            <p className="text-gray-600 text-sm">Rol: {admin?.role}</p>
            <p className="text-gray-600 text-sm">Kanal ID: {channel.id}</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition">
            Tahrirlash
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fanlar</h3>
          {channel.subjects.length === 0 ? (
            <p className="text-gray-500 italic">Hozircha fanlar qo‘shilmagan</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {channel.subjects.map((subject: string, i: number) => (
                <li key={i}>{subject}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
