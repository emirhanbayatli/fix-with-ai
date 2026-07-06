import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessageFromCode(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Geçersiz e-posta adresi.";

    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      return "E-posta veya şifre hatalı.";

    case "auth/wrong-password":
      return "Şifre hatalı.";

    case "auth/email-already-in-use":
      return "Bu e-posta adresi zaten kullanımda.";

    case "auth/weak-password":
      return "Şifre en az 6 karakter olmalıdır.";

    case "auth/missing-password":
      return "Lütfen şifrenizi girin.";

    case "auth/too-many-requests":
      return "Çok fazla başarısız giriş denemesi yapıldı. Lütfen daha sonra tekrar deneyin.";

    case "auth/network-request-failed":
      return "İnternet bağlantınızı kontrol edip tekrar deneyin.";

    case "auth/requires-recent-login":
      return "Bu işlemi yapmak için tekrar giriş yapmanız gerekiyor.";

    case "auth/user-disabled":
      return "Bu hesap devre dışı bırakılmıştır.";
    case "auth/popup-closed-by-user":
      return "Giriş penceresi kapatıldı.";
    case "auth/popup-blocked":
      return "Tarayıcı açılır pencereyi engelledi.";

    default:
      console.log("err code", code);
      return "Bir hata oluştu. Lütfen tekrar deneyin.";
  }
}

export const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);

  const d = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const t = date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${d} • ${t}`;
};
