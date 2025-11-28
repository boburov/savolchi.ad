import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin - Savolchi | Test tuzish ilovasi",
  description:
    "Savolchi - online test tuzish va boshqarish ilovasi. Har qanday test tuzish, o‘quvchilarga test yuborish va natijalarni kuzatish imkoniyati.",
  icons: {
    icon: "/savolchi.svg",
  },
  applicationName: "Admin Savolchi",
  keywords: [
    "Savolchi",
    "test tuzish",
    "online test",
    "quiz builder",
    "test yaratish",
    "o‘quvchi testi",
    "test platformasi",
    "savollar",
    "online quiz",
    "test generator",
  ],
  verification: {
    google: "SUekuXNlaNhW_wY6SHvAPG0u7YIva8OfSXytYvps4WA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="montserrat-600 tracking-wider">{children}</body>
    </html>
  );
}
