"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Home, PlusCircle, History, LogOut, User, LogIn } from "lucide-react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-white rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-[#c3c6d7]/30 pb-safe">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center p-2 transition-colors flex-1 ${
          pathname === "/" ? "text-[#004ac6] font-semibold" : "text-[#434655]"
        }`}
      >
        <Home className="w-5 h-5 transition-transform active:scale-95" />
        <span className="text-[10px] mt-1">Ana Sayfa</span>
      </Link>

      {!loading && user && (
        <>
          <Link
            href="/history"
            className={`flex flex-col items-center justify-center p-2 transition-colors flex-1 ${
              pathname === "/history"
                ? "text-[#004ac6] font-semibold"
                : "text-[#434655]"
            }`}
          >
            <History className="w-5 h-5 transition-transform active:scale-95" />
            <span className="text-[10px] mt-1">Geçmiş</span>
          </Link>

          <Link
            href="/analyze"
            className={`flex flex-col items-center justify-center p-2 transition-colors flex-1 ${
              pathname === "/analyze"
                ? "text-[#004ac6] font-semibold"
                : "text-[#434655]"
            }`}
          >
            <PlusCircle className="w-5 h-5 transition-transform active:scale-95" />
            <span className="text-[10px] mt-1">Analiz Et</span>
          </Link>
        </>
      )}

      <div className="flex flex-col items-center justify-center p-2 flex-1">
        {loading ? (
          <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
        ) : !user ? (
          <Link
            href="/login"
            className={`flex flex-col items-center justify-center transition-colors ${
              pathname === "/login"
                ? "text-[#004ac6] font-semibold"
                : "text-[#434655]"
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] mt-1">Giriş Yap</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none flex flex-col items-center justify-center">
                <Avatar className="h-7 w-7 cursor-pointer border border-indigo-100 shadow-sm">
                  <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
                    {(user.fullName || user.email || "K")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[10px] mt-1 text-[#434655]">Profil</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="top"
              className="w-48 p-2 mb-2"
            >
              <div className="p-2 text-xs font-bold text-slate-700 truncate">
                {user.fullName || "Kullanıcı"}
              </div>
              <DropdownMenuSeparator />

              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer flex items-center text-sm">
                  <User className="mr-2 h-4 w-4" />
                  Profil Ayarları
                </DropdownMenuItem>
              </Link>

              <Link href="/history">
                <DropdownMenuItem className="cursor-pointer flex items-center text-sm">
                  <History className="mr-2 h-4 w-4" />
                  Geçmiş
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600 flex items-center text-sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-medium">Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
