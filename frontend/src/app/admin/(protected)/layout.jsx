"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedAdminLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        router.push("/login");
      } else {
        setIsAuthorized(true);
      }
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // Return null while checking auth to prevent flashing content
  }

  return <>{children}</>;
}
