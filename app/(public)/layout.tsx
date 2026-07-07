"use client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/features/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      {children}
    </main>
  );
}
