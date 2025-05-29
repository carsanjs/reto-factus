"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export const PrivatedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace("/");
    } else {
      setIsVerified(true);
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized || !isVerified) {
    return null;
  }

  return { children };
};
