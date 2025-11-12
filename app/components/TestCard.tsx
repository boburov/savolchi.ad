"use client";
import Link from "next/link";
import { useState } from "react";
import { KeyRound } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  level: "Boshlang‘ich" | "O‘rta" | "Murakkab";
  participants: number;
  private?: boolean;
  password?: string;
}

interface Props {
  lesson: Lesson;
  courseId: number;
}

const TestCard = ({ lesson, courseId }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const handleCheckPassword = () => {
    if (passwordInput === lesson.password) {
      setShowPassword(false);
      window.location.href = `/courses/${courseId}/lessons/${lesson.id}`;
    } else {
      alert("Parol noto‘g‘ri ❌");
    }
  };

  if (lesson.private && !showPassword) {
    return (
      <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
          <KeyRound className="text-red-500" size={18} />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Test paroli..."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <button
            onClick={handleCheckPassword}
            className="bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-800 transition"
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
      <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 shadow-sm hover:bg-purple-100 cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded-md text-xs font-medium">
            {lesson.level}
          </span>
          <span>👥 {lesson.participants} ta ishtirokchi</span>
        </div>
      </div>
    </Link>
  );
};

export default TestCard;
