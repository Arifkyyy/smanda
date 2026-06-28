import { GraduationCap, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { Card, StatCard } from "../../components/ui";
import { totalStudents, pendingConsults, attendanceToday, grades } from "../../data/mock";

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
const trend = [72, 75, 78, 76, 80, 82];

export default function DashboardAdmin() {
  const schoolAvg =
    Math.round((grades.reduce((sum, g) => sum + g.nilai, 0) / grades.length) * 10) / 10;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Admin</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Siswa Aktif" value={String(totalStudents)} tone="purple" />
        <StatCard
          icon={CheckCircle2}
          label="Absensi Hari Ini"
          value={`${attendanceToday.pct}%`}
          hint={`${attendanceToday.present.length} hadir`}
          tone="emerald"
        />
        <StatCard
          icon={AlertCircle}
          label="Konsul Pending"
          value={String(pendingConsults)}
          hint="Perlu ditinjau"
          tone="amber"
        />
        <StatCard icon={TrendingUp} label="Rata Nilai Sekolah" value={String(schoolAvg)} tone="sky" />
      </div>
      <Card className="p-6">
        <h2 className="font-semibold text-slate-800 mb-5">Tren Rata-rata Nilai (6 bulan)</h2>
        <div className="flex items-end gap-3 h-40">
          {trend.map((v, i) => (
            <div key={months[i]} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-indigo-500"
                style={{ height: `${v}%` }}
              />
              <span className="text-xs text-slate-400">{months[i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
