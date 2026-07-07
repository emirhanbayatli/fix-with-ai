"use client";

import { useState } from "react";
import { UploadSection } from "@/components/UploadSection";
import ResultCard from "@/components/ResultCard";

export default function Page() {
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleAnalysisComplete = (data: any, localUrl: string) => {
    setAnalysisData(data);
    setImageUrl(localUrl);
  };

  if (analysisData && imageUrl) {
    return (
      <ResultCard
        title={analysisData.title}
        steps={analysisData.steps}
        materials={analysisData.materials}
        imageUrl={imageUrl}
        analysisText={analysisData.analysisText}
        warningText={analysisData.warningText}
        difficulty={analysisData.difficulty}
        estTime={analysisData.estTime}
      />
    );
  }

  return <UploadSection onAnalysisComplete={handleAnalysisComplete} />;
}
