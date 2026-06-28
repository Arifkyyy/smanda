import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

type Tone = "purple" | "emerald" | "amber" | "sky";

const tones: Record<Tone, string> = {
  purple: "from-purple-600 to-indigo-600",
  emerald: "from-emerald-500 to-teal-600",
  amber: "from-amber-500 to-orange-500",
  sky: "from-sky-500 to-blue-600",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "purple",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  tone?: Tone;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
          {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
        </div>
        <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${tones[tone]} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}

const statusStyles: Record<string, string> = {
  Menunggu: "bg-amber-50 text-amber-600 ring-amber-200",
  Disetujui: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Tervalidasi: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  "Tepat Waktu": "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Terlambat: "bg-rose-50 text-rose-600 ring-rose-200",
};

export function StatusPill({ status }: { status: string }) {
  const cls = statusStyles[status] ?? "bg-slate-50 text-slate-500 ring-slate-200";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${cls}`}>
      {status}
    </span>
  );
}

export function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-xl px-4 py-3">
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
    </div>
  );
}
