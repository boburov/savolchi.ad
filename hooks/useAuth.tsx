import authService from "@/app/api/service/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token =
        localStorage.getItem("token") || localStorage.getItem("refreshToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const fullUser = await authService.verifyToken(token);

        setUser(fullUser.data);
      } catch (err) {
        console.error("Token verify error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { user, loading };
};

export default useAuth;
