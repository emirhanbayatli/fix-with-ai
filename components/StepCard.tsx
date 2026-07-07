import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-sm">
      <div className="w-16 h-16 bg-[#004ac6] text-white rounded-full flex items-center justify-center mb-6 text-2xl font-bold shadow-lg">
        {number}
      </div>
      <Icon className="text-[#004ac6] w-12 h-12 mb-4" />
      <h3 className="text-[24px] font-semibold mb-2">{title}</h3>
      <p className="text-[#434655] text-[16px]">{description}</p>
    </div>
  );
}
