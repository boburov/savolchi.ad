"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import channelService from "@/app/api/service/channel.service";

export default function ChannelPage() {
  const { chanel_id }: any = useParams();
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chanel_id) return;

    channelService
      .get_chanel_by_id(chanel_id)
      .then((res) => setChannel(res.data))
      .finally(() => setLoading(false));
  }, [chanel_id]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );

  if (!channel)
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Channel not found
      </div>
    );

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50">

      {/* Banner */}
      <div className="w-full h-56 md:h-72 bg-gray-200 relative">
        {channel.banner ? (
          <img
            src={channel.banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300" />
        )}

        {/* PFP */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <img
            src={channel.pfp}
            alt="pfp"
            className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-20 max-w-2xl w-full flex flex-col items-center px-5 text-center">
        {/* Name */}
        <h1 className="text-3xl font-bold text-gray-900">
          {channel.name}
        </h1>

        {/* Bio */}
        <p className="text-gray-600 mt-3 text-lg leading-relaxed">
          {channel.bio || "This channel has no bio yet."}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition">
            Testlar
          </button>

          <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium shadow-sm transition">
            Tahrirlash
          </button>
        </div>
      </div>
    </div>
  );
}
