"use client";

import authService from "@/app/api/service/auth.service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const token = useSearchParams().get("token");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await authService.verifyToken(String(token));

      if (res.status === 201) {
        localStorage.setItem("admin_mail", res.data.email);
        setMessage("token qabul qilindi");
      } else {
        console.log("token noto'gri");
        setMessage("token noto'gri");
      }
    };

    fetchData();
  }, []);

  return <div>{message}</div>;
};

export default page;
