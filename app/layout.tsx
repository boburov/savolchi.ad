import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="SUekuXNlaNhW_wY6SHvAPG0u7YIva8OfSXytYvps4WA"
        />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <link rel="icon" href={metadata.icons.icon} />
        <title>{metadata.title}</title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
