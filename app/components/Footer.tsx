"use client";

import { Github, Linkedin, Mail, Globe } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-6">
      <div className="container mx-auto text-center flex flex-col items-center gap-3">
        {/* Asosiy matn */}
        <p className="text-gray-700 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-purple-700">Boburov Shukurullo</span> – Frontend Developer & Creator of{" "}
          <span className="font-medium text-purple-600">Savolchi Platform</span>
        </p>

        {/* Social links */}
        <div className="flex justify-center gap-5 mt-1">
          <Link
            href="https://github.com/boburov"
            target="_blank"
            className="text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Github size={20} />
          </Link>

          <Link
            href="https://linkedin.com/in/boburovdev"
            target="_blank"
            className="text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Linkedin size={20} />
          </Link>

          <a
            href="mailto:boburovdev@gmail.com"
            className="text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Mail size={20} />
          </a>

          <Link
            href="https://boburov.uz"
            target="_blank"
            className="text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Globe size={20} />
          </Link>
        </div>

        {/* Texnik info */}
        <p className="mt-2 text-xs text-gray-400">
          Built with ❤️ using <span className="font-semibold text-purple-600">Next.js</span> &{" "}
          <span className="font-semibold text-purple-600">TailwindCSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
