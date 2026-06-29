"use client";

import { useState } from "react";
import {
  Bot,
  SignalHigh,
  Clock,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface Material {
  id: string;
  name: string;
  checked: boolean;
}

interface ResultPageProps {
  steps: Step[];
  materials: Material[];
  imageUrl: string;
  analysisText: string;
  difficulty?: string;
  estTime?: string;
  warningText?: string;
}

export default function ResultCard({
  steps = [],
  materials: initialMaterials = [],
  imageUrl,
  analysisText,
  difficulty = "Başlangıç",
  warningText = "Tamire başlamadan önce gerekli tüm enerji, gaz veya su kaynaklarını kapattığınızdan emin olun.",
  estTime = "20 dk",
}: ResultPageProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);

  const handleOrderMissingMaterials = () => {
    const missingMaterials = materials.filter((item) => !item.checked);

    if (missingMaterials.length === 0) {
      toast.info(
        "Tüm malzemeleriniz hazır görünüyor! Eksik malzeme bulunamadı.",
      );
      return;
    }

    const searchQuery = missingMaterials
      .map((item) => `"${item.name}"`)
      .join(" OR ");

    const googleShoppingUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(searchQuery)}`;

    window.open(googleShoppingUrl, "_blank", "noopener,noreferrer");
  };

  const toggleMaterial = (id: string) => {
    setMaterials((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const progressPercentage =
    steps.length > 0 ? Math.round((activeStep / steps.length) * 100) : 0;

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen antialiased">
      <main className="pt-24 pb-32 px-6 max-w-[1280px] mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7 relative group">
            <div className="rounded-2xl overflow-hidden aspect-video shadow-lg bg-white/80 backdrop-blur-xl border border-gray-200">
              {imageUrl ? (
                <img
                  className="w-full h-full object-cover"
                  alt="Yüklenen Arıza Görseli"
                  src={imageUrl}
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                  Görsel Bulunamadı
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-xl border border-[#c3c6d7]/30 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#dbe1ff] p-2 rounded-xl">
                  <Bot className="text-[#004ac6] w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-[#004ac6]">
                  Yapay Zeka Analizi
                </h2>
              </div>
              <p className="text-sm text-[#434655] leading-relaxed">
                {analysisText || "Analiz verisi yükleniyor..."}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-[#e7e8e9] px-3 py-1 rounded-full flex items-center gap-2 text-xs text-[#434655]">
                  <SignalHigh className="w-4 h-4" />
                  Zorluk: {difficulty}
                </span>
                <span className="bg-[#e7e8e9] px-3 py-1 rounded-full flex items-center gap-2 text-xs text-[#434655]">
                  <Clock className="w-4 h-4" />
                  Tahmini Süre: {estTime}
                </span>
              </div>
            </div>

            <div className="bg-[#ffdad6] border border-[#ba1a1a]/20 p-6 rounded-2xl flex gap-4 items-start">
              <AlertTriangle className="text-[#ba1a1a] w-6 h-6 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#ba1a1a] uppercase">
                  Güvenlik Uyarısı
                </span>
                <p className="text-sm text-[#93000a]">{warningText}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <h3 className="text-2xl font-bold">Tamir Adımları</h3>
            <div className="flex flex-col gap-12">
              {steps.map((step, index) => {
                const isCurrent = activeStep === step.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className="flex gap-6 relative cursor-pointer group"
                  >
                    {index !== steps.length - 1 && (
                      <div className="w-0.5 bg-[#e1e3e4] absolute left-[15px] top-[30px] bottom-[-20px]"></div>
                    )}

                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 shadow-md transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#004ac6] text-white"
                          : "bg-[#e1e3e4] text-[#434655]"
                      }`}
                    >
                      {index + 1}
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#004ac6]/40 rounded-full animate-[pulse-halo_2s_infinite]"></div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4
                        className={`text-lg font-bold transition-colors ${isCurrent ? "text-[#004ac6]" : "text-[#191c1d]"}`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[#434655] text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#191c1d]">
                  Mevcut İlerleme
                </span>
                <span className="text-sm font-bold text-[#004ac6]">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#edeeef] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#004ac6] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col gap-6">
              <h5 className="text-lg font-bold">Gerekli Malzemeler</h5>
              <ul className="flex flex-col gap-4">
                {materials.map((material) => (
                  <li
                    key={material.id}
                    className="flex items-center justify-between group"
                  >
                    <label className="flex items-center gap-3 cursor-pointer select-none w-full">
                      <input
                        type="checkbox"
                        checked={material.checked}
                        onChange={() => toggleMaterial(material.id)}
                        className="w-5 h-5 rounded border-[#737686] text-[#004ac6] focus:ring-[#004ac6]"
                      />
                      <span
                        className={`text-sm transition-colors ${material.checked ? "line-through text-slate-400" : "text-[#191c1d]"}`}
                      >
                        {material.name}
                      </span>
                    </label>
                  </li>
                ))}
                <li className="pt-4">
                  <button
                    onClick={handleOrderMissingMaterials}
                    className="w-full bg-[#004ac6] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#004ac6]/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Eksik Parçaları Sipariş Et
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
