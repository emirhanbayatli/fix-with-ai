"use client";

import { AnalysisHistoryItem } from "@/lib/types";
import { ArrowRight, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HistoryCardProps {
  item: AnalysisHistoryItem;
}

export default function HistoryCard({ item }: HistoryCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 border border-gray-200/80 hover:shadow-md hover:border-gray-300/50 transition-all duration-300 group cursor-pointer animate-in fade-in slide-in-from-bottom-4 w-full">
      <div className="flex flex-col sm:flex-row gap-5 md:gap-7 items-start sm:items-stretch">
        <div className="relative w-full sm:w-28 sm:h-28 md:w-36 md:h-36 aspect-square rounded-xl shrink-0 overflow-hidden bg-indigo-50 border border-indigo-100/80 flex flex-col items-center justify-center text-[#004ac6] transition-colors group-hover:bg-indigo-100/50">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 p-4">
              <Wrench className="w-8 h-8 md:w-10 md:h-10 text-[#004ac6] group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-[10px] md:text-[11px] text-[#004ac6] font-semibold uppercase tracking-wider block">
                Aktif
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between py-0.5 w-full space-y-4 sm:space-y-0">
          <div>
            <div className="flex justify-between items-start gap-4 mb-1.5">
              <h3 className="font-bold text-lg md:text-xl text-[#191c1d] group-hover:text-[#004ac6] transition-colors line-clamp-1">
                {item.title || "Arıza Analizi"}
              </h3>
              <p className="text-[11px] md:text-xs text-gray-400 font-medium shrink-0 pt-1">
                {new Date(item.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>

            <p className="text-sm md:text-base text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed">
              {item.analysisText || "Arıza detayları ve çözüm analizi."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100/80 w-full">
            <div className="flex gap-2 flex-wrap">
              <span className="text-[11px] md:text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md">
                {item.difficulty}
              </span>

              <span className="text-[11px] md:text-xs font-semibold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-md">
                {item.estTime}
              </span>

              <span className="text-[11px] md:text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md">
                {item.steps?.length || 0} Adım
              </span>
            </div>

            <Link
              href={`/history/${item.id}`}
              className="text-xs md:text-sm font-bold text-[#004ac6] flex items-center gap-1.5 hover:underline shrink-0 group/btn py-1"
            >
              <span>Detayları Gör</span>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
