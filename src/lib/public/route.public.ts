"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export const PublicRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  console.log(" is authenticated public , ", isAuthenticated);

  useEffect(() => {
    if (!isInitialized) return;

    if (isAuthenticated) {
      router.replace("/dashboard");
    } else {
      setIsVerified(true);
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized || !isVerified) {
    return null;
  }

  return { children };
};
