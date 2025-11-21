"use client";

import { useState } from "react";
import { CheckCircle2, Star, Crown, Zap, BadgePercent } from "lucide-react";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  duration: string;
  limit: number;
  branch: number;
  type: "MONTHLY" | "THREE_MONTHS" | "SIX_MONTHS" | "YEARLY";
  icon: any;
  highlight?: boolean;
  bestValue?: boolean;
}

const basePrice = 8.99;

const plans: Plan[] = [
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
    price: 24.99, // 8.99*3=26.97 emas, chegirma bilan 24.99
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
    price: 44.99, // 8.99*6=53.94 emas, chegirma bilan 44.99
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
    price: 78.99, // 8.99*12=107.88 emas, chegirma bilan 78.99
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

const SubscriptionPage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (plan: Plan) => {
    setSelected(plan.id);
    setLoading(true);
    router.push(`pricing/${plan.type}`);
    await new Promise((r) => setTimeout(r, 100));
    alert(`${plan.name} obuna tanlandi (${plan.duration})!`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Obuna rejalari</h1>
      <p className="text-gray-600 mb-10 text-center max-w-xl">
        O‘zingizga mos reja tanlang va chegirmali narxlarda to‘liq test
        tizimidan foydalaning.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-2 ${
                plan.highlight
                  ? "border-purple-600 scale-105"
                  : "border-transparent hover:border-purple-200"
              }`}
            >
              {/* Badges */}
              {plan.bestValue && (
                <span className="absolute text-center -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                  Eng foydali tanlov 💎
                </span>
              )}
              {plan.highlight && !plan.bestValue && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Mashhur tanlov
                </span>
              )}

              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>

                {/* Pricing */}
                <div className="mb-4 flex flex-col items-center">
                  {plan.oldPrice && (
                    <p className="text-gray-400 text-2xl line-through mb-1">
                      ${plan.oldPrice.toFixed(2)}
                    </p>
                  )}
                  <p className="text-5xl font-extrabold text-purple-600">
                    ${plan.price}
                  </p>
                  {plan.discount && (
                    <div className="flex items-center gap-1 mt-2 text-green-600 font-semibold text-sm">
                      <BadgePercent className="w-4 h-4" />
                      <span>{plan.discount}% chegirma</span>
                    </div>
                  )}
                </div>

                <ul className="text-gray-700 text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {plan.limit} ta test limiti
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {plan.branch} ta bo‘lim
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    To‘liq test tizimi
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading && selected === plan.id}
                className={`mt-8 w-full py-3 rounded-full font-semibold text-white transition ${
                  loading && selected === plan.id
                    ? "bg-purple-400"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading && selected === plan.id
                  ? "Aktivlanmoqda..."
                  : "Obuna bo‘lish"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPage;
