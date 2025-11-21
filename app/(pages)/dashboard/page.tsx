"use client";
import { useState } from "react";
import {
  Lock,
  School,
  Unlock,
  MessageSquare,
  Search,
  KeyRound,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

interface SchoolType {
  id: number;
  name: string;
  description: string;
  locked: boolean;
  password?: string;
}

interface TestType {
  id: number;
  title: string;
  level: "Boshlang‘ich" | "O‘rta" | "Murakkab";
  participants: number;
  private: boolean;
  password?: string;
}

interface Comment {
  id: number;
  text: string;
  user: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [selectedSchool, setSelectedSchool] = useState<SchoolType | null>(null);
  const [unlockedSchools, setUnlockedSchools] = useState<number[]>([]);
  const [passwordInput, setPasswordInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("Barchasi");
  const [unlockedTests, setUnlockedTests] = useState<number[]>([]);
  const [testPasswordInput, setTestPasswordInput] = useState<number | null>(null);
  const [testPasswordValue, setTestPasswordValue] = useState("");

  const schools: SchoolType[] = [
    {
      id: 1,
      name: "TATU Maktabi",
      description: "IT yo‘nalishidagi testlar",
      locked: false,
    },
    {
      id: 2,
      name: "Nukus Akademik Litseyi",
      description: "Matematika testlari",
      locked: true,
      password: "9999",
    },
    {
      id: 3,
      name: "Fizika Maktabi",
      description: "Fizika faniga oid testlar",
      locked: false,
    },
  ];

  const tests: TestType[] = [
    {
      id: 1,
      title: "🧠 Fizika — 1-qism",
      level: "Boshlang‘ich",
      participants: 128,
      private: false,
    },
    {
      id: 2,
      title: "📘 Algebra — 2-qism",
      level: "O‘rta",
      participants: 234,
      private: true,
      password: "algebra123",
    },
    {
      id: 3,
      title: "📗 Informatika — 3-qism",
      level: "Murakkab",
      participants: 87,
      private: false,
    },
    {
      id: 4,
      title: "📙 Geometriya — 1-qism",
      level: "Boshlang‘ich",
      participants: 312,
      private: false,
    },
    {
      id: 5,
      title: "📕 Kimyo — 2-qism",
      level: "O‘rta",
      participants: 156,
      private: true,
      password: "chem321",
    },
  ];

  // 🏫 Maktabni tanlash
  const handleEnterSchool = (school: SchoolType) => {
    if (!school.locked || unlockedSchools.includes(school.id)) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(school); // Parol oynasi chiqadi
    }
  };

  // 🔐 Maktab parolini tekshirish
  const handleUnlockSchool = () => {
    if (selectedSchool && passwordInput === selectedSchool.password) {
      setUnlockedSchools([...unlockedSchools, selectedSchool.id]);
      setPasswordInput("");
      alert("Maktabga kirish ochildi ✅");
    } else {
      alert("Parol noto‘g‘ri ❌");
    }
  };

  // 💬 Izoh qo‘shish
  const handleAddComment = () => {
    if (commentText.trim().length === 0) return;
    const newComment: Comment = {
      id: Date.now(),
      text: commentText,
      user: user?.name || "Siz",
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // 🔎 Testlar filtr
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "Barchasi" ? true : test.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleUnlockTest = (testId: number, password?: string) => {
    const selectedTest = tests.find((t) => t.id === testId);
    if (selectedTest && testPasswordValue === selectedTest.password) {
      setUnlockedTests([...unlockedTests, testId]);
      setTestPasswordInput(null);
      setTestPasswordValue("");
      alert("Testga kirish ruxsat berildi ✅");
    } else {
      alert("Test paroli noto‘g‘ri ❌");
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-10 px-4 border-x  border-gray-300 min-h-[80vh] ">
        {/* 🧑‍💻 Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-purple-700">
            Xush kelibsiz,{" "}
            <span className="text-gray-800">{user?.name || "Foydalanuvchi"} 👋</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Quyidagi maktablardan birini tanlang va o‘rganishni davom eting.
          </p>
        </div>

        {/* 📚 Maktablar yoki testlar */}
        {!selectedSchool ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <div
                key={school.id}
                onClick={() => handleEnterSchool(school)}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer hover:border-purple-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <School size={22} className="text-purple-700" />
                    <h2 className="font-semibold text-gray-800">{school.name}</h2>
                  </div>
                  {school.locked ? (
                    <Lock className="text-red-500" size={18} />
                  ) : (
                    <Unlock className="text-green-500" size={18} />
                  )}
                </div>
                <p className="text-sm text-gray-600">{school.description}</p>
                {school.locked && !unlockedSchools.includes(school.id) && (
                  <p className="text-xs text-gray-400 mt-2">
                    🔒 Parol talab qilinadi
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : selectedSchool.locked && !unlockedSchools.includes(selectedSchool.id) ? (
          // 🔑 Maktab parolini so‘rash
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {selectedSchool.name} — yopiq maktab
            </h2>
            <p className="text-gray-500 mb-4">Kirish uchun parolni kiriting</p>
            <div className="flex justify-center gap-2">
              <input
                type="password"
                placeholder="Parol..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <button
                onClick={handleUnlockSchool}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition"
              >
                Kirish
              </button>
            </div>
          </div>
        ) : (
          // 📘 Testlar ro‘yxati
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <button
              onClick={() => setSelectedSchool(null)}
              className="text-sm text-purple-700 hover:underline mb-4"
            >
              ← Orqaga qaytish
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {selectedSchool.name}
            </h2>

            {/* 🔍 Qidiruv va filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Testlarni qidiring..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border rounded-lg w-full text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="Barchasi">Barcha darajalar</option>
                <option value="Boshlang‘ich">Boshlang‘ich</option>
                <option value="O‘rta">O‘rta</option>
                <option value="Murakkab">Murakkab</option>
              </select>
            </div>

            {/* 🧠 Testlar */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className="p-4 bg-purple-50 hover:bg-purple-100 transition rounded-xl border border-purple-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">{test.title}</h4>
                    {test.private && !unlockedTests.includes(test.id) && (
                      <KeyRound className="text-red-500" size={18} />
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded-md text-xs font-medium">
                      {test.level}
                    </span>
                    <span>👥 {test.participants} ta ishtirokchi</span>
                  </div>

                  {/* 🔒 Private test uchun parol */}
                  {test.private && !unlockedTests.includes(test.id) && (
                    <div className="mt-3 flex flex-col gap-2">
                      <input
                        type="password"
                        placeholder="Test paroli..."
                        value={
                          testPasswordInput === test.id
                            ? testPasswordValue
                            : ""
                        }
                        onChange={(e) => {
                          setTestPasswordInput(test.id);
                          setTestPasswordValue(e.target.value);
                        }}
                        className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <button
                        onClick={() => handleUnlockTest(test.id, test.password)}
                        className="bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-800 transition"
                      >
                        Tasdiqlash
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
