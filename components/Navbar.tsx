"use client";

import { useAuth } from "@/features/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { LogOut, User, Wrench, History } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-8">
        <Link
          href={user ? "/analyze" : "/"}
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <Wrench className="h-5 w-5 text-indigo-600" />
          <span>Fix with AI</span>
        </Link>

        <div className="flex items-center gap-2">
          {loading ? (
            <>
              <div className="h-6 w-20 rounded-md bg-muted animate-pulse" />
              <div className="h-6 w-24 rounded-md bg-muted animate-pulse" />
            </>
          ) : user ? (
            <>
              <Link
                href="/analyze"
                className="px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
              >
                Analyze
              </Link>

              <Link
                href="/history"
                className="px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
              >
                History
              </Link>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : !user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                      {(user.fullName || user.email || "U")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuLabel className="p-3">
                  <p className="text-sm font-bold">{user.fullName || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>

                <Link href="/history">
                  <DropdownMenuItem className="cursor-pointer">
                    <History className="mr-2 h-4 w-4" />
                    History
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
