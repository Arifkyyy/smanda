import { Search, Filter } from "lucide-react";

interface ToolbarProps {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}

export default function Toolbar({ value, onChange, placeholder = "Cari nama siswa…" }: ToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
        />
      </div>
      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
        <Filter size={16} /> Filter Kelas
      </button>
    </div>
  );
}
