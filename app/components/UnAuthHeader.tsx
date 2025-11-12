"use client";

import { LogIn, LifeBuoy, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/savolchi.svg";

const UnAuthHeader = () => {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-[#1c1c1c] gap-3"
        >
          <Image src={logo} alt="Savolchi logo" className="w-7 h-7" />
          admin.savolchi
        </Link>

        {/* Links */}
        <div className="flex items-center gap-5 text-gray-700 font-medium">
          <Link
            href="/support"
            className="flex items-center gap-1 hover:text-purple-700 transition"
          >
            <LifeBuoy size={18} /> Support
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-1 hover:text-purple-700 transition"
          >
            <Mail size={18} /> Contact
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center gap-2 bg-purple-200 text-purple-700 hover:bg-purple-300 px-3 py-2 rounded-full transition-colors duration-200 font-semibold"
          >
            <LogIn size={18} />
            Kirish
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UnAuthHeader;
