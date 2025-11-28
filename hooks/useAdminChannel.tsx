import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/app/api/service/auth.service";

interface Channel {
  id: number;
  name: string;
  pfp?: string;
  banner?: string;
  bio?: string;
  createdAt: string;
  subject: Subject[];
}

interface Subject {
  id: number;
  name: string;
  channelId: number;
  createdAt: string;
}

interface Subscription {
  type: string;
  limit: number;
  active: boolean;
  subjectLimit: number;
  expiresAt: string;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription: Subscription;
  isVerified: boolean;
  channel?: Channel | null;
}

const useAdminChannel = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token =
        localStorage.getItem("token") || localStorage.getItem("refreshToken");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const fullAdmin = await authService.verifyToken(token);

        // faqat ADMIN bo‘lsa davom etadi
        if (fullAdmin.data.role !== "ADMIN") {
          router.push("/auth/login");
          return;
        }
        setAdmin(fullAdmin.data);
        localStorage.setItem("chanel_id", fullAdmin.data.id);
        setChannel(fullAdmin.data.channel || null);
      } catch (err) {
        console.error("Admin channel verify error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  return { admin, channel, loading };
};

export default useAdminChannel;
