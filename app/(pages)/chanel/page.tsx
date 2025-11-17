"use client";

import useAdminChannel from "@/hooks/useAdminChannel";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { admin } = useAdminChannel();
  const router = useRouter();

  // Obuna yo'q
  if (!admin?.subscription) {
    return (
      <section className="w-full h-[75vh] flex flex-col items-center justify-center ">
        <p className="font-extrabold text-2xl w-1/2 text-center mb-7">
          Siz avval obuna sotib olib keyin kanal yaratishingiz kerak
        </p>
        <button
          onClick={() => router.push("/pricing")}
          className="bg-purple-700 text-white rounded-xl flex items-center gap-3 px-5 py-2.5"
        >
          <Plus strokeWidth={4} /> Obuna Sotib Olish
        </button>
      </section>
    );
  }

  // Obuna bor, kanal yo'q
  if (admin.subscription && !admin?.channel) {
    return (
      <section className="w-full h-[75vh] flex flex-col items-center justify-center ">
        <p className="font-extrabold text-2xl w-1/2 text-center mb-7">
          Siz obunaga egasiz, lekin kanal mavjud emas
        </p>
        <button
          onClick={() => router.push("/create/channel")}
          className="bg-purple-700 text-white rounded-xl flex items-center gap-3 px-5 py-2.5"
        >
          <Plus strokeWidth={4} /> Kanal Yaratish
        </button>
      </section>
    );
  }

  // Obuna va kanal mavjud
  return (
    <section className="container min-h-[75vh] flex flex-col items-center justify-center">
      <img
        src={admin?.channel?.pfp}
        alt={admin?.channel?.name}
        className="w-40 h-40 rounded-full mb-5"
      />
      <h2 className="text-3xl font-bold mb-3">{admin?.channel?.name}</h2>
      <p className="text-center mb-5">{admin?.channel?.bio}</p>
      {admin?.channel?.banner && (
        <img
          src={admin?.channel.banner}
          alt="Banner"
          className="w-full max-w-3xl rounded-lg mb-5"
        />
      )}
      {admin?.channel?.subjects && admin.channel.subjects.length > 0 && (
        <div className="w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-3">Subjects:</h3>
          <ul className="list-disc list-inside">
            {admin?.channel.subjects.map((sub: string, idx: number) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Page;
