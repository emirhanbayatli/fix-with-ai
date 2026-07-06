"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/features/auth/AuthProvider";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ResultCard from "@/components/ResultCard";
import Link from "next/link";

export default function HistoryDetail() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [analysisData, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;

    const fetchHistory = async () => {
      try {
        const docRef = doc(db, "analyses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAnalysis(docSnap.data());
        } else {
          console.error("Analiz bulunamadı.");
        }
      } catch (error) {
        console.error("Geçmiş yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>

          <h1 className="text-2xl font-bold text-[#191c1d] mb-3">
            Analiz Bulunamadı
          </h1>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Aradığınız analiz silinmiş, bağlantı geçersiz olabilir veya bu
            içeriğe erişim izniniz bulunmuyor.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#004ac6] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ResultCard
      title={analysisData.title}
      steps={analysisData.steps}
      materials={analysisData.materials}
      imageUrl={analysisData.imageUrl}
      analysisText={analysisData.analysisText}
      warningText={analysisData.warningText}
      difficulty={analysisData.difficulty}
      estTime={analysisData.estTime}
    />
  );
}
