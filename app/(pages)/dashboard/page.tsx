"use client";
import { useEffect, useState } from "react";
import {
  Lock,
  School,
  Unlock,
  MessageSquare,
  Search,
  KeyRound,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import channel from "@/app/api/service/channel.service";

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
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await channel.getAll();
      console.log(res);
    };
    fetchData();
  }, []);

  const [testPasswordInput, setTestPasswordInput] = useState<number | null>(
    null
  );
  const [testPasswordValue, setTestPasswordValue] = useState("");
  useSubscription();

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

  const handleEnterSchool = (school: SchoolType) => {
    if (!school.locked || unlockedSchools.includes(school.id)) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(school);
    }
  };

  const handleUnlockSchool = () => {
    if (selectedSchool && passwordInput === selectedSchool.password) {
      setUnlockedSchools([...unlockedSchools, selectedSchool.id]);
      setPasswordInput("");
      alert("Maktabga kirish ochildi ✅");
    } else {
      alert("Parol noto‘g‘ri ❌");
    }
  };

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

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      selectedLevel === "Barchasi" ? true : test.level === selectedLevel;
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
  console.log(
    "%cSavolchi",
    "color: #ff00ff; font-size: 50px; font-weight: bold; text-shadow: 3px 3px #000;"
  );

  console.log("%cCreated By Boburov ❤️", "font-size: 30px; color: #61dafb;");
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-10 px-4 border-x  border-gray-300 min-h-[80vh] ">
        {/* 🧑‍💻 Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-purple-700">
            Xush kelibsiz,{" "}
            <span className="text-gray-800">
              {user?.name || "Foydalanuvchi"} 👋
            </span>
          </h1>
          <p className="text-gray-500 mt-2">
            Quyidagi maktablardan birini tanlang va o‘rganishni davom eting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
