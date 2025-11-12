"use client";

import {
  BarChart2,
  Users,
  FileText,
  Settings,
  Star,
  CheckCircle,
} from "lucide-react";
import UnAuthHeader from "./components/UnAuthHeader";
import { useEffect, useState } from "react";
import channel from "./api/service/channel.service";
import useAuth from "@/hooks/useAuth";
import Header from "./components/Header";

const AdminDashboard = () => {
  const [auth, setAuth] = useState(true);
  useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const res = await channel.getAll();
      console.log(res);
    };

    const token = localStorage.getItem("token");

    if (token) {
      setAuth(!auth);
    }
    fetchData();
  }, []);
  return (
    <>
      {auth == true ? <UnAuthHeader /> : <Header />}
      <div className="min-h-screen flex flex-col px-4 py-10 container border-x border-gray-300 mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-700">
              Admin Panel
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Barcha foydalanuvchilar, testlar va statistika shu yerda
              boshqariladi
            </p>
          </div>

          <button className="mt-4 sm:mt-0 bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-purple-800 transition flex items-center gap-2">
            <Settings size={18} /> Sozlamalar
          </button>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-5 shadow hover:shadow-md transition text-center">
            <Users className="text-purple-700 mx-auto mb-2" size={34} />
            <h3 className="font-bold text-sm mb-1">Foydalanuvchilar</h3>
            <p className="text-gray-600 text-xs">1,238 ta faol foydalanuvchi</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow hover:shadow-md transition text-center">
            <FileText className="text-purple-700 mx-auto mb-2" size={34} />
            <h3 className="font-bold text-sm mb-1">Testlar</h3>
            <p className="text-gray-600 text-xs">245 ta faol test mavjud</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow hover:shadow-md transition text-center">
            <BarChart2 className="text-purple-700 mx-auto mb-2" size={34} />
            <h3 className="font-bold text-sm mb-1">Statistika</h3>
            <p className="text-gray-600 text-xs">
              O‘rtacha natija: 78% muvaffaqiyat
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow hover:shadow-md transition text-center">
            <Star className="text-purple-700 mx-auto mb-2" size={34} />
            <h3 className="font-bold text-sm mb-1">Faol foydalanuvchilar</h3>
            <p className="text-gray-600 text-xs">
              Eng faol 10 ta foydalanuvchi ro‘yxatga olingan
            </p>
          </div>
        </section>

        <section className="bg-purple-100 rounded-xl p-8 mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-3">
            So‘nggi faoliyat
          </h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              ✅ <span className="font-semibold">Anvar</span> yangi test
              qo‘shdi.
            </li>
            <li>
              ⭐ <span className="font-semibold">Zulfiya</span> 90% natija bilan
              “Frontend” testini topshirdi.
            </li>
            <li>
              🧠 <span className="font-semibold">Rustam</span> “Backend”
              bo‘limiga 3 ta savol qo‘shdi.
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow text-center mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-purple-700 mb-2">
            Barcha tizimlar faol
          </h2>
          <p className="text-gray-600 text-sm">
            Serverlar ishlamoqda, ma’lumotlar bazasi ulanishi barqaror. Barcha
            foydalanuvchilar tizimdan foydalana olishmoqda.
          </p>
          <div className="flex justify-center mt-4">
            <CheckCircle className="text-green-500 animate-pulse" size={28} />
          </div>
        </section>

        <footer className="text-center text-gray-500 text-xs sm:text-sm mt-4 pb-8">
          <p>
            Savolchi Admin Panel - Boburov Shukurullo tomonidan ishlab
            chiqilgan.
          </p>
          <p>Next.js & TailwindCSS asosida qurilgan boshqaruv interfeysi.</p>
        </footer>
      </div>
    </>
  );
};

export default AdminDashboard;
