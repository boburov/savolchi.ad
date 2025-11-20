"use client";

import useAdminChannel from "@/hooks/useAdminChannel";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { admin } = useAdminChannel();
  const router = useRouter();

  // 1) Obuna yo'q
  if (!admin?.subscription) {
    return (
      <section className="w-full h-[75vh] flex flex-col items-center justify-center">
        <p className="font-extrabold text-2xl text-center mb-7 w-3/4">
          Avval obuna sotib oling, shundan keyin kanal yaratishingiz mumkin
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

  // 2) Obuna bor, kanal yo‘q
  if (admin.subscription && !admin?.channel) {
    return (
      <section className="w-full h-[75vh] flex flex-col items-center justify-center">
        <p className="font-extrabold text-2xl text-center mb-7 w-3/4">
          Sizda obuna bor, lekin hali kanal yaratmagansiz
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

  // 3) Obuna va kanal mavjud
  const channel = admin.channel;
  const subscription = admin.subscription;

  // Sana formatlash
  const endDate = subscription?.endDate
    ? new Date(subscription.endDate).toLocaleDateString("uz-UZ")
    : "Noma'lum";

  return (
    <section className="container max-w-3xl mx-auto py-10 flex flex-col items-center">
      {/* Banner */}
      {channel?.banner && (
        <div className="w-full mb-6">
          <img
            src={channel?.banner}
            alt="Banner"
            className="w-full h-56 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* PFP */}
      <img
        src={channel?.pfp}
        alt={channel?.name}
        className="w-36 h-36 rounded-full border-4 border-white shadow-xl -mt-20 mb-4"
      />

      {/* Name */}
      <h2 className="text-4xl font-bold mb-2">{channel?.name}</h2>

      {/* Bio */}
      <p className="text-center text-gray-700 mb-6 px-5">{channel?.bio}</p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-5">
        <div className="bg-white/70 shadow-md rounded-xl p-5 text-center">
          <p className="text-xl font-bold">{channel?.testsCount || 0}</p>
          <p className="text-gray-600">Joylangan testlar</p>
        </div>

        <div className="bg-white/70 shadow-md rounded-xl p-5 text-center">
          <p className="text-xl font-bold">{subscription.type}</p>
          <p className="text-gray-600">Obuna turi</p>
        </div>

        <div className="bg-white/70 shadow-md rounded-xl p-5 text-center">
          <p className="text-xl font-bold">{subscription.limit}</p>
          <p className="text-gray-600">Test limiti</p>
        </div>

        <div className="bg-white/70 shadow-md rounded-xl p-5 text-center">
          <p className="text-xl font-bold">{endDate}</p>
          <p className="text-gray-600">Obuna tugash sanasi</p>
        </div>
      </div>

      {/* Subjects */}
      {channel?.subjects && channel?.subjects.length > 0 && (
        <div className="w-full mt-10">
          <h3 className="text-xl font-semibold mb-3">Fanlar:</h3>
          <ul className="list-disc list-inside">
            {channel?.subjects.map((sub, idx) => (
              <li key={idx} className="text-gray-700">
                {sub}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Page;
