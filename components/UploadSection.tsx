"use client";

import { useState, ChangeEvent } from "react";
import { Upload, X, Cpu, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/AuthProvider";

interface UploadSectionProps {
  onAnalysisComplete: (data: any, localImageUrl: string) => void;
}

export function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage || !previewUrl) return;

    try {
      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("userId", user?.id || "anonymous");
      formData.append("additionalNotes", additionalNotes.trim());

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Sunucu hatası oluştu.");
      }

      const parsedData = await res.json();

      if (parsedData.error) {
        toast.error(parsedData.error);
        return;
      }

      onAnalysisComplete(parsedData, previewUrl);
      toast.success("Analiz başarıyla tamamlandı!");
    } catch (error) {
      toast.error("Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative py-12 md:py-20 flex flex-col items-center text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#191c1d] leading-tight">
          Sorun Nedir?
        </h1>
        <p className="text-lg md:text-xl text-[#434655]">
          Sorunları anında tespit edin ve saniyeler içinde adım adım tamir
          rehberine ulaşın. Sadece bize sorunu gösterin.
        </p>
      </div>

      <div className="mt-12 w-full max-w-2xl px-4 flex flex-col gap-6 items-center">
        <div
          id="drop-zone"
          className="relative w-full bg-white rounded-3xl p-8 md:p-16 border-2 border-dashed border-[#c3c6d7] transition-all hover:border-[#004ac6] flex flex-col items-center justify-center cursor-pointer shadow-sm overflow-hidden min-h-[300px]"
        >
          {!previewUrl ? (
            <>
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#004ac6] rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#004ac6] rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#004ac6] rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#004ac6] rounded-br-lg"></div>

              <div className="bg-[#dbe1ff] text-[#004ac6] p-6 rounded-full mb-6">
                <Upload className="w-12 h-12" />
              </div>

              <div className="space-y-2 flex flex-col items-center">
                <p className="font-semibold text-slate-700">
                  Fotoğraf Yüklemek İçin Tıklayın
                </p>
                <p className="text-sm text-[#434655]">
                  veya görseli buraya sürükleyip bırakın
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Desteklenen formatlar: JPEG, JPG, WEBP
                </p>
              </div>

              <input
                type="file"
                accept=".jpeg, .jpg, .webp"
                id="images"
                name="images"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
            </>
          ) : (
            <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden shadow-md group/preview">
              <img
                src={previewUrl}
                alt="Seçilen Sorun Önizlemesi"
                className="w-full h-full object-cover"
              />
              {!isAnalyzing && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-colors"
                  title="Fotoğrafı Kaldır"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="w-full bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm flex flex-col items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label
              htmlFor="notes"
              className="flex items-center gap-2 text-sm font-semibold text-[#434655]"
            >
              <MessageSquareText className="w-4 h-4 text-[#004ac6]" />
              <span>Eklemek İstediğiniz Detaylar</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              disabled={isAnalyzing}
              placeholder="Cihazın markası, modeli veya arızanın ne zaman ve nasıl gerçekleştiği hakkında kısa bilgi ekleyebilirsiniz... (Örn: Arçelik çamaşır makinesi, sıkma yaparken aşırı ses çıkarıyor)"
              className="w-full rounded-xl border-gray-200 text-sm text-[#191c1d] placeholder:text-gray-400 focus:border-[#004ac6] focus:ring-[#004ac6] transition-all resize-none p-3 bg-[#f8f9fa]"
            />
          </div>
        )}

        {previewUrl && (
          <button
            type="button"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            className="bg-[#004ac6] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 w-full sm:w-auto justify-center"
          >
            <Cpu className={`w-5 h-5 ${isAnalyzing ? "animate-spin" : ""}`} />
            {isAnalyzing ? "Yapay Zeka Analiz Ediyor..." : "Sorunu Analiz Et"}
          </button>
        )}
      </div>
    </section>
  );
}
