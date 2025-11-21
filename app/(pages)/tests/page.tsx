"use client";

import useAdminChannel from "@/hooks/useAdminChannel";
import { BadgeCheck, Plus, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const { admin } = useAdminChannel();
  const router = useRouter();
  console.log(admin);

  if (admin?.subscription) {
    if (admin?.channel == null) {
      return (
        <div className="container min-h-[75vh] flex flex-col gap-5 items-center justify-center">
          <h1 className="text-3xl text-gray-800 text-center montserrat-regular w-2/3">
            Hurmatli{" "}
            <span className="font-bold uppercase text-purple-500">
              {admin?.name}
            </span>{" "}
            sizda hozircha Kanal Mavjud emas Itimos boshlashdan avval kanal
            yarating
          </h1>
          <button
            onClick={() => {
              router.push("/create/channel");
            }}
            className="flex gap-3 items-center px-5 py-2.5 bg-purple-700 rounded-full text-white"
          >
            <Plus /> Kanal Yaratish
          </button>
        </div>
      );
    }
    {
      const channel = admin.channel;
      return (
        <section className="min-h-[75vh] container flex justify-between py-5">
          {/* left channel card section */}
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

            {/* text section */}
            <section className="p-5">
              {/* chanel name */}
              <h1 className="text-xl font-bold flex items-center gap-1 text-gray-800 leading-2">
                {channel.name} {admin.is_verifyed ? <BadgeCheck /> : ""}
              </h1>

              {/* chanel created time */}
              <span className="text-gray-500 text-xs mb-2 inline-block">
                {channel.createdAt.slice(0, 10)}
              </span>

              {/* line */}
              <hr className=" mb-3 text-gray-400" />
              <p className="text-sm italic text-gray-700 mb-5">{channel.bio}</p>

              <span className="font-semibold">Joylangan testlar : 356</span>
              <br />

              <span className="font-semibold">
                Limit : {admin.subscription.limit}
              </span>
            </section>
            {/* text sction ending */}
          </section>
        </section>
      );
    }
  } else {
    return (
      <div className="container min-h-[75vh] flex flex-col gap-5 items-center justify-center">
        <h1 className="text-3xl text-gray-800 text-center montserrat-regular w-2/3">
          Hurmatli{" "}
          <span className="font-bold uppercase text-purple-500">
            {admin?.name}
          </span>{" "}
          sizda hozircha obunagiz mavjud emas Iltimos Avval Obuna Sotib Oling
        </h1>
        <button
          onClick={() => {
            router.push("/pricing");
          }}
          className="flex gap-3 items-center px-5 py-2.5 bg-purple-700 rounded-full text-white"
        >
          <Plus /> Sotib Olish
        </button>
      </div>
    );
  }
};

export default page;
