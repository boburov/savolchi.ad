"use client";

import { useState } from "react";
import {
  Copy,
  Mail,
  Smartphone,
  MessageSquare,
  Check,
  ExternalLink,
} from "lucide-react";

type Profile = {
  role: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  phoneLink?: string;
  color: "purple" | "lime";
  bio: string;
  avatarUrl?: string;
};

const profiles: Profile[] = [
  {
    role: "Creator",
    fullName: "Boburov Shukurullo",
    username: "rovixwb",
    email: "boburovshukurullo@gmail.com",
    phone: "+998-20-002-04-46",
    phoneLink: "+998200020446",
    color: "lime",
    bio: "Savolchi platformasida kontent yaratuvchi va tizim dizayneri. Texnologiya, frontend va ta’limni uyg‘unlashtirishga ixtisoslashgan.",
    avatarUrl: "https://avatars.githubusercontent.com/u/137058543?v=4",
  },
];

const Avatar = ({
  name,
  color,
  avatarUrl,
}: {
  name: string;
  color: "purple" | "lime";
  avatarUrl?: string;
}) => {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-20 h-20 rounded-full object-cover shadow-md p-1 bg-lime-300"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bg =
    color === "purple"
      ? "bg-gradient-to-br from-purple-600 to-purple-400"
      : "bg-gradient-to-br from-lime-500 to-lime-300";

  return (
    <div
      className={`${bg} w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md`}
      aria-hidden
    >
      {initials}
    </div>
  );
};

const ContactRow = ({
  icon,
  label,
  value,
  copyLabel,
  onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyLabel: string;
  onCopy: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-gray-500">{icon}</div>
        <div className="min-w-0">
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-sm text-gray-800 truncate">{value}</div>
        </div>
      </div>

      <button
        onClick={onCopy}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition"
        aria-label={copyLabel}
        title={copyLabel}
      >
        <Copy size={14} />
        <span>Copy</span>
      </button>
    </div>
  );
};

const Page = () => {
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((s) => ({ ...s, [key]: true }));
      setTimeout(() => {
        setCopied((s) => ({ ...s, [key]: false }));
      }, 1600);
    } catch {
      alert(
        "Clipboard ga nusxalab bo'lmadi. Iltimos, qo'lda nusxa ko'chiring."
      );
    }
  };

  const normalizeTel = (raw?: string) => {
    if (!raw) return "";
    return raw.replace(/[^\d+]/g, "");
  };

  return (
    <div className="min-h-[75vh] bg-gray-50 flex py-10 px-4 items-center">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {profiles.map((p) => {
          const isPurple = p.color === "purple";
          const cardBorder = isPurple ? "border-purple-200" : "border-lime-200";
          const badgeBg = isPurple
            ? "bg-purple-600 text-white"
            : "bg-lime-600 text-white";
          const btnBg = isPurple
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-lime-600 hover:bg-lime-700";
          const telegramUrl = `https://t.me/${p.username}`;
          const telLink = `tel:${p.phoneLink ? normalizeTel(p.phoneLink) : normalizeTel(p.phone)}`;

          return (
            <article
              key={p.username + p.email}
              className={`bg-white border ${cardBorder} rounded-2xl shadow-sm p-6 flex flex-col gap-5`}
            >
              <header className="flex items-center gap-4">
                <Avatar
                  name={p.fullName}
                  color={p.color}
                  avatarUrl={p.avatarUrl}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${badgeBg} font-medium`}
                    >
                      {p.role}
                    </span>

                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition"
                    >
                      <MessageSquare size={14} />
                      <span className="underline">@{p.username}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {p.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                    {p.bio}
                  </p>
                </div>
              </header>

              <div className="flex flex-col gap-3">
                <ContactRow
                  icon={<Mail size={18} className="text-gray-400" />}
                  label="Email"
                  value={p.email}
                  copyLabel={`Copy email ${p.email}`}
                  onCopy={() => handleCopy(`${p.username}-email`, p.email)}
                />
                <div className="h-px bg-gray-100 my-1" />
                <ContactRow
                  icon={<MessageSquare size={18} className="text-gray-400" />}
                  label="Telegram"
                  value={`@${p.username}`}
                  copyLabel={`Copy telegram @${p.username}`}
                  onCopy={() =>
                    handleCopy(`${p.username}-tg`, `@${p.username}`)
                  }
                />
                <div className="h-px bg-gray-100 my-1" />
                <ContactRow
                  icon={<Smartphone size={18} className="text-gray-400" />}
                  label="Telefon"
                  value={p.phone}
                  copyLabel={`Copy phone ${p.phone}`}
                  onCopy={() => handleCopy(`${p.username}-phone`, p.phone)}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {copied[`${p.username}-email`] && (
                  <span className="inline-flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                    <Check size={14} /> Email nusxalandi
                  </span>
                )}
                {copied[`${p.username}-tg`] && (
                  <span className="inline-flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                    <Check size={14} /> Telegram nusxalandi
                  </span>
                )}
                {copied[`${p.username}-phone`] && (
                  <span className="inline-flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                    <Check size={14} /> Telefon nusxalandi
                  </span>
                )}
              </div>

              <footer className="mt-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
                <p className="text-xs text-gray-500 max-w-xs">
                  Aloqa uchun yuqoridagi kanallardan birini tanlang. Iltimos,
                  maqsadsiz bezovta qilmang.
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 text-white px-4 py-2 rounded-lg ${btnBg} text-sm font-medium transition`}
                  >
                    <MessageSquare size={16} /> Telegram
                  </a>
                  <a
                    href={telLink}
                    className="text-sm px-3 py-2 flex items-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Smartphone size={18} /> Telefon
                  </a>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
