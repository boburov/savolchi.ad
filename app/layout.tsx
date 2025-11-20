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
  openGraph: {
    title: "Admin - Savolchi | Test tuzish ilovasi",
    description:
      "Savolchi - online test tuzish va boshqarish ilovasi. Har qanday test tuzish, o‘quvchilarga test yuborish va natijalarni kuzatish imkoniyati.",
    url: "https://yourdomain.com",
    siteName: "Savolchi",
    images: [
      {
        url: "/savolchi.svg",
        width: 800,
        height: 600,
        alt: "Savolchi Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin - Savolchi | Test tuzish ilovasi",
    description:
      "Savolchi - online test tuzish va boshqarish ilovasi. Har qanday test tuzish, o‘quvchilarga test yuborish va natijalarni kuzatish imkoniyati.",
    images: ["/savolchi.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="SUekuXNlaNhW_wY6SHvAPG0u7YIva8OfSXytYvps4WA"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
