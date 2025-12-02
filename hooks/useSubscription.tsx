import { useRouter } from "next/navigation";
import useAdminChannel from "./useAdminChannel";

const useSubscription = () => {
  const useFettcher = () => {
    const { admin } = useAdminChannel();
    const router = useRouter();

    const expiresAt = admin?.subscription?.expiresAt
      ? new Date(admin.subscription.expiresAt)
      : null;

    function verifyDate() {
      if (!expiresAt) return false;

      const now = new Date();

      const isExpired = now.getTime() > expiresAt.getTime();

      return isExpired;
    }

    if (verifyDate() === true) {
      router.push("/priceing");
    } else {
      console.log("%cHammasi Joida", "font-size: 50px; color: #9D00FF;");
      }
  };

  useFettcher();
};

export default useSubscription;
