"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Star, Zap, CheckCircle2, Crown } from "lucide-react";
import useAdminChannel from "@/hooks/useAdminChannel";

const basePrice = 8.99;

const plans = [
  {
    id: "1",
    name: "1 oylik",
    price: basePrice,
    oldPrice: 10.99,
    discount: 20,
    duration: "1 oy",
    limit: 300,
    branch: 4,
    type: "MONTHLY",
    icon: Star,
  },
  {
    id: "2",
    name: "3 oylik",
    price: 24.99,
    oldPrice: basePrice * 3,
    discount: Math.round(((basePrice * 3 - 24.99) / (basePrice * 3)) * 100),
    duration: "3 oy",
    limit: 500,
    branch: 6,
    type: "THREE_MONTHS",
    icon: Zap,
  },
  {
    id: "3",
    name: "6 oylik",
    price: 44.99,
    oldPrice: basePrice * 6,
    discount: Math.round(((basePrice * 6 - 44.99) / (basePrice * 6)) * 100),
    duration: "6 oy",
    limit: 1000,
    branch: 10,
    type: "SIX_MONTHS",
    icon: CheckCircle2,
    highlight: true,
  },
  {
    id: "4",
    name: "1 yillik",
    price: 78.99,
    oldPrice: basePrice * 12,
    discount: Math.round(((basePrice * 12 - 78.99) / (basePrice * 12)) * 100),
    limit: 2000,
    branch: 12,
    duration: "12 oy",
    type: "YEARLY",
    icon: Crown,
    bestValue: true,
  },
];

const Page = () => {
  const { subscription } = useParams();
  const router = useRouter();

  const { admin } = useAdminChannel();

  const plan = useMemo(
    () => plans.find((p) => p.type === String(subscription)),
    [subscription]
  );

  useEffect(() => {
    if (!plan) router.push("/create/channel/");
  }, [plan, router]);

  if (!plan) return null;

  const tgUsername = "rovixwb"; // shu yerga admin Telegram username yoziladi

  const handleContact = () => {
    window.open(
      `https://t.me/savolchi_obuna_bot?start=${admin?.id}/${plan.type}`,
      "_blank"
    );
  };

  const Icon = plan.icon;

  return (
    <div className="container h-[75vh] flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Icon className="w-10 h-10 text-purple-500" />
        <h2 className="text-2xl font-semibold">{plan.name}</h2>
        <p className="text-gray-500">{plan.duration} obuna</p>
        <p className="text-lg font-bold">
          {plan.price} USD{" "}
          <span className="text-sm line-through text-gray-400">
            {plan.oldPrice.toFixed(2)} USD
          </span>{" "}
          <span className="text-green-500">(-{plan.discount}%)</span>
        </p>
        <p className="text-gray-600 text-sm max-w-md">
          Bu to‘lov hozircha avtomatik tarzda amalga oshmaydi. Obunani sotib
          olish uchun quyidagi tugma orqali admin bilan bog‘laning.
        </p>
      </div>

      <button
        onClick={handleContact}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
      >
        Admin bilan bog‘lanish
      </button>
    </div>
  );
};

export default Page;
