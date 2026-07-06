"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import HistoryCard from "@/components/HistoryCard";
import { Sparkles, History, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AnalysisHistoryItem } from "@/lib/types";

export default function HistoryPage() {
  const { user } = useAuth();
  const [historyItems, setHistoryItems] = useState<AnalysisHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, "analyses"),
          where("userId", "==", user.id),
          orderBy("createdAt", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => doc.data());
        setHistoryItems(items as []);
      } catch (error) {
        console.error("Geçmiş yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen space-y-4 max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Tamir Geçmişiniz</h1>
      {historyItems.length === 0 ? (
        <div className="flex flex-col items-center text-center p-8 md:p-12 bg-white rounded-3xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300 mt-4">
          <div className="relative mb-6">
            <div className="bg-indigo-50 text-[#004ac6] p-5 rounded-full relative z-10">
              <History className="w-10 h-10" />
            </div>
            <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-600 p-2 rounded-full animate-bounce delay-200">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#191c1d] mb-3">
            Henüz Bir Arıza Analiz Etmediniz
          </h2>
          <p className="text-sm text-[#434655] max-w-sm mb-8 leading-relaxed">
            Evde, arabada veya elektronik cihazlarınızda bozulan ne varsa
            fotoğrafını yükleyin; yapay zeka saniyeler içinde size özel tamir
            rehberini hazırlasın.
          </p>

          <div className="w-full bg-[#f8f9fa] rounded-2xl p-4 mb-8 text-left space-y-3 border border-gray-200/40">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Nasıl Çalışır?
            </p>
            <div className="flex items-start gap-3 text-sm">
              <span className="bg-[#dbe1ff] text-[#004ac6] font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                1
              </span>
              <p className="text-slate-700">
                Sorunun net bir fotoğrafını çekin veya yükleyin.
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="bg-[#dbe1ff] text-[#004ac6] font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                2
              </span>
              <p className="text-slate-700">
                Yapay zekanın arızayı ve gerekli malzemeleri çıkarmasını
                bekleyin.
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="bg-[#dbe1ff] text-[#004ac6] font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                3
              </span>
              <p className="text-slate-700">
                Adım adım talimatlarla tasarruf ederek kendiniz tamir edin!
              </p>
            </div>
          </div>

          <Link href="/analyze" className="inline-block w-full sm:w-auto">
            <button className="bg-[#004ac6] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 w-full">
              <Wrench className="w-5 h-5" />
              <span>İlk Analizi Başlat</span>
            </button>
          </Link>
        </div>
      ) : (
        historyItems.map((item) => <HistoryCard key={item.id} item={item} />)
      )}
    </div>
  );
}
