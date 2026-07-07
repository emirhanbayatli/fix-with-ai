import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
}

export function CategoryCard({ icon: Icon, label }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl transition-transform hover:-translate-y-2 cursor-pointer group">
      <div className="w-16 h-16 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] group-hover:bg-[#004ac6] group-hover:text-white transition-colors">
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-[14px] font-medium">{label}</span>
    </div>
  );
}
