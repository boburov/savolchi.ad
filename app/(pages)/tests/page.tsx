"use client";

import useAdminChannel from "@/hooks/useAdminChannel";

const page = () => {
  const { admin } = useAdminChannel();

  console.log(admin);

  return <div>page</div>;
};

export default page;
