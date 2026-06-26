"use client";
import { useState } from "react";
import { useAuth } from "@/features/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { User, Lock, ChevronRight, LogOut, Trash2 } from "lucide-react";
import {
  deleteUserAccount,
  updateUserName,
  updateUserPassword,
} from "@/features/auth/actions";
import { toast } from "sonner";
import ConfirmAlertDialog from "@/components/ConfirmAlertDialog";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const menuItems = [
    { id: "general", label: "Genel Bilgiler", icon: User },
    { id: "security", label: "Güvenlik & Şifre", icon: Lock },
  ];

  const handleUpdateName = async () => {
    const name = fullName.trim();

    if (!name) {
      toast.error("İsim alanı boş bırakılamaz.");
      return;
    }

    if (name === user?.fullName) {
      return;
    }

    if (name.length < 3) {
      toast.error("İsim en az 3 karakterden oluşmalıdır.");
      return;
    }

    if (name.length > 50) {
      toast.error("İsim çok uzun.");
      return;
    }

    try {
      await updateUserName(user?.id as string, name);
      toast.success("İsim başarıyla güncellendi!");
    } catch (error) {
      toast.error("Güncelleme başarısız oldu.");
    }
  };

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      if (!currentPassword || !newPassword) {
        toast.error("Lütfen her iki şifre alanını da doldurun.");
        return;
      }
      if (newPassword.length < 8) {
        toast.error("Yeni şifre en az 8 karakter olmalıdır.");
        return;
      }
      if (newPassword.length > 100) {
        toast.error("Yeni şifre çok uzun.");
        return;
      }
      if (currentPassword === newPassword) {
        toast.error("Yeni şifre, mevcut şifre ile aynı olamaz.");
        return;
      }
      const res = await updateUserPassword(currentPassword, newPassword);
      if (!res.success) {
        toast.error(res.message);
        return;
      } else {
        toast.success(res.message);
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      toast.error("Güncelleme başarısız oldu.");
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  const handleDeleteAccount = async (password: string) => {
    const res = await deleteUserAccount(password);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    setOpenModal(false);
    logout();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Ayarlar</h1>
        <p className="text-slate-500">
          Hesabınızı ve kişisel tercihlerinizi yönetin.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {activeTab === item.id && <ChevronRight size={14} />}
            </button>
          ))}

          <hr className="my-4 border-slate-100" />

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </aside>

        <main className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {activeTab === "general" && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Genel Bilgiler
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      disabled
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleUpdateName}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  >
                    Değişiklikleri Kaydet
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {user?.type === "emailPassword" ? (
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Güvenlik & Şifre
                  </h2>
                  <div className="max-w-md space-y-4">
                    <p className="text-sm text-slate-500 mb-4">
                      Şifrenizi değiştirmek için lütfen mevcut şifrenizi girin,
                      ardından yeni şifrenizi belirleyin.
                    </p>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        title="current"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        title="new"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                      />
                    </div>
                    <Button
                      onClick={() =>
                        handleUpdatePassword(currentPassword, newPassword)
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
                    >
                      Şifreyi Güncelle
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500 mb-4">
                  Hesabınız Google ile oluşturulmuştur. Şifrenizi değiştirmek
                  için lütfen Google Hesap ayarlarınızı ziyaret edin.
                </p>
              )}
              <div className="mt-12 pt-8 border-t border-red-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg text-red-600">
                    <Trash2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-600">Hesabı Sil</h4>
                    <p className="text-sm text-slate-500 mt-1 mb-4">
                      Uyarı: Bu işlem kalıcıdır ve tüm hesap verilerinizi
                      silecektir.
                    </p>
                    <Button
                      onClick={() => setOpenModal(true)}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Hesabımı Sil
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      {openModal && (
        <ConfirmAlertDialog
          open={openModal}
          onOpenChange={setOpenModal}
          title="Hesap Silme İşlemini Onayla"
          description={
            "Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz. Onaylamak için lütfen şifrenizi girin."
          }
          requireInput={true}
          inputLabel="Şifre"
          inputPlaceholder="Şifrenizi girin"
          onConfirm={async (password) => {
            if (!password?.trim()) {
              toast.error("Hesabı silmek için şifre gereklidir.");
              return;
            }
            await handleDeleteAccount(password);
          }}
        />
      )}
    </div>
  );
}
