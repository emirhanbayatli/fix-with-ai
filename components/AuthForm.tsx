"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/features/auth/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import { SocialButton } from "./SocialButton";

interface Auth {
  fullName: string;
  email: string;
  password: string;
}
interface AuthFormProps {
  type: "login" | "register" | "resetPassword";
}
export function AuthForm({ type }: AuthFormProps) {
  const { login, signUp, resetPassword, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({ mode: "all" });

  return (
    <div className="w-full max-w-[480px] bg-white rounded-2xl border border-gray-200 shadow-xl p-8 md:p-12 flex flex-col gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Fix with AI</h1>
        <h2 className="text-xl font-semibold text-gray-900">
          {type == "login" ? "Tekrar Hoş Geldiniz!" : "Hesabınızı Oluşturun"}
        </h2>
        <p className="text-sm text-gray-500">
          Yükleyin, yapay zeka ile analiz edin ve tamir edin
        </p>
      </div>

      {type != "resetPassword" ? (
        <div className="flex flex-col gap-6">
          <SocialButton provider="google" signInGoogleBtn={signInWithGoogle} />
          <span className="text-center text-[10px] text-gray-400 font-bold uppercase">
            Veya şununla devam edin
          </span>
        </div>
      ) : null}

      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(async (data) => {
          if (type == "register") {
            await signUp(data.email, data.password, data.fullName);
            return;
          } else if (type == "login") {
            await login(data.email, data.password);
          } else {
            await resetPassword(data.email);
          }
        })}
      >
        {type === "register" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ad Soyad
            </label>
            <input
              {...register("fullName", {
                required: "Ad soyad alanı zorunludur!",
                minLength: {
                  value: 3,
                  message: "Ad soyad en az 3 karakter olmalıdır",
                },
                maxLength: {
                  value: 100,
                  message: "Ad soyad 100 karakteri geçmemelidir",
                },
                pattern: {
                  value: /^[A-Za-zÇĞİÖŞÜçğıöşü\s]+$/,
                  message: "Ad soyad sadece harflerden oluşabilir",
                },
              })}
              type="text"
              placeholder="Ahmet Yılmaz"
              className="h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            E-posta Adresi
          </label>
          <input
            {...register("email", {
              required: "E-posta adresi zorunludur!",
              minLength: {
                value: 5,
                message:
                  "E-posta adresi en az 5 karakter uzunluğunda olmalıdır",
              },
              maxLength: {
                value: 150,
                message: "E-posta adresi 150 karakteri geçmemelidir",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Geçersiz e-posta formatı",
              },
            })}
            type="email"
            placeholder="isim@sirket.com"
            className="h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {type != "resetPassword" ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Şifre</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Şifre alanı zorunludur!",
                  minLength: {
                    value: 8,
                    message: "Şifre en az 8 karakter uzunluğunda olmalıdır",
                  },
                  maxLength: {
                    value: 60,
                    message: "Şifre 60 karakteri geçmemelidir",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Şifrenizi girin"
                className="h-12 w-full pl-4 pr-12 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="flex justify-end items-center text-sm mt-1">
              <Link
                href="/reset-password"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Şifrenizi mi unuttunuz?
              </Link>
            </div>
          </div>
        ) : null}

        <button className="h-12 mt-2 text-white font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm">
          {type == "login"
            ? "Giriş Yap"
            : type == "resetPassword"
              ? "Şifreyi Sıfırla"
              : "Kayıt Ol"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        {type == "login"
          ? "Hesabınız yok mu?"
          : type == "resetPassword"
            ? "Şifrenizi hatırladınız mı?"
            : "Zaten bir hesabınız var mı?"}
        <Link
          href={type === "login" ? "/register" : "/login"}
          className="ml-1 font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          {type === "login" ? "Kayıt Ol" : "Giriş Yap"}
        </Link>
      </p>
    </div>
  );
}
