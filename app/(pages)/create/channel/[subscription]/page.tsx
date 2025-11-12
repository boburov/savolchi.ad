"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const subscriptions = ["YEARLY", "SIX_MONTHS", "THREE_MONTHS", "MONTHLY"];

const page = () => {
  const { subscription } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!subscriptions.includes(String(subscription))) {
      router.push("/create/channel/");
    }
  }, []);

  return <div className="container h-[75vh]">{subscription}</div>;
};

export default page;
