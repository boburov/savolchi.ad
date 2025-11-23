"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Star,
  Crown,
  Zap,
  BadgePercent,
  Sparkles,
  Users,
  FileText,
  Headphones,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
    popular: true,
    features: [
      "300 ta test limiti",
      "4 ta bo'lim",
      "Premium test tizimi",
      "24/7 qo'llab-quvvatlash",
      "Asosiy xususiyatlar"
    ]
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
    features: [
      "500 ta test limiti",
      "6 ta bo'lim",
      "Premium test tizimi",
      "24/7 qo'llab-quvvatlash",
      "Barcha xususiyatlar",
      "3 oy davomida tejash"
    ]
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
    icon: Crown,
    highlight: true,
    features: [
      "1000 ta test limiti",
      "10 ta bo'lim",
      "Premium test tizimi",
      "24/7 qo'llab-quvvatlash",
      "Barcha xususiyatlar",
      "6 oy davomida tejash",
      "Avtomatik yangilanish"
    ]
  },
  {
    id: "4",
    name: "1 yillik",
    price: 78.99,
    oldPrice: basePrice * 12,
    discount: Math.round(((basePrice * 12 - 78.99) / (basePrice * 12)) * 100),
    duration: "12 oy",
    limit: 2000,
    branch: 12,
    type: "YEARLY",
    icon: Shield,
    bestValue: true,
    features: [
      "2000 ta test limiti",
      "12 ta bo'lim",
      "Premium test tizimi",
      "24/7 qo'llab-quvvatlash",
      "Barcha xususiyatlar",
      "1 yil davomida tejash",
      "Avtomatik yangilanish",
      "Maxsus qo'llab-quvvatlash"
    ]
  },
];

const SubscriptionPage = () => {
  const { admin } = useAdminChannel();
  const subscription = admin?.subscription;

  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // ❗ SUBSCRIPTION BOR — INFO KO'RSATILADI
  if (subscription) {
    const planName =
      subscription.type === "MONTHLY"
        ? "1 oylik"
        : subscription.type === "THREE_MONTHS"
          ? "3 oylik"
          : subscription.type === "SIX_MONTHS"
            ? "6 oylik"
            : "1 yillik";

    const expires = new Date(subscription.expiresAt).toLocaleDateString(
      "uz-UZ",
      { year: "numeric", month: "numeric", day: "numeric" }
    );

    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl text-center border border-purple-200">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Faol Obuna
            </h1>

            <p className="text-gray-600 mb-6">Premium funksiyalar yoqilgan.</p>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-medium">Obuna turi:</span>
                <span className="font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  {planName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Tugash sanasi:</span>
                <span className="font-semibold text-gray-900">{expires}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Dashboardga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ❗ SUBS YO'Q — PRICING
  const handleSubscribe = async (plan: any) => {
    setSelected(plan.id);
    setLoading(true);

    try {
      router.push(`/pricing/${plan.type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-100/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Test Tizimi
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Obuna Rejalari
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
           {` O'zingizga`} mos rejani tanlang va chegirmalar bilan foydalaning. 
            Barcha rejalar soliqlarsiz, 30 kunlik pulni qaytarish kafolati.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isBestValue = plan.bestValue;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`
                  group relative bg-white rounded-3xl p-6 shadow-lg 
                  hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
                  border-2 ${isBestValue ? 'border-purple-500 shadow-xl' : 'border-gray-200/60'}
                  ${isPopular ? 'ring-2 ring-purple-400 ring-opacity-50' : ''}
                  flex flex-col h-full
                `}
              >
                {/* Badge */}
                {isBestValue && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Eng Yaxshi Taklif
                    </div>
                  </div>
                )}

                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      Mashhur
                    </div>
                  </div>
                )}

                {/* Icon & Header */}
                <div className="text-center mb-6 pt-2">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {plan.duration} obuna
                  </p>
                </div>

                {/* Price Section */}
                <div className="text-center mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  {plan.oldPrice && (
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-gray-400 line-through text-lg">
                        ${plan.oldPrice.toFixed(2)}
                      </span>
                      {plan.discount && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                          -{plan.discount}%
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 text-sm">/ {plan.duration.toLowerCase()}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-1 mb-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limits Info */}
                <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-purple-700">
                      <FileText className="w-4 h-4" />
                      <span>{plan.limit} test</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-700">
                      <Users className="w-4 h-4" />
                      <span>{plan.branch} {`bo'lim`}</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading && selected === plan.id}
                  className={`
                    w-full py-4 rounded-xl text-white font-semibold 
                    bg-gradient-to-r from-purple-600 to-purple-700
                    hover:from-purple-700 hover:to-purple-800
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    transform hover:scale-[1.02] active:scale-[0.98]
                    ${loading && selected === plan.id ? "opacity-50 cursor-not-allowed" : ""}
                    ${isBestValue ? 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' : ''}
                  `}
                >
                  {loading && selected === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Aktivlanmoqda...
                    </span>
                  ) : (
                    "Obuna {`bo'lish`}"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Xavfsiz {`to'lov`}</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-blue-600">
              <Headphones className="w-5 h-5" />
              <span className="text-sm font-medium">24/7 {`Qo'llab`}-quvvatlash</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-purple-600">
              <BadgePercent className="w-5 h-5" />
              <span className="text-sm font-medium">30 kunlik kafolat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;