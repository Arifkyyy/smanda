import { TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { Card, StatCard } from "../../components/ui";
import { myGrades, myAverage, consultations, currentStudent } from "../../data/mock";

export default function DashboardSiswa() {
  const top = myGrades.slice(0, 5);

  const myConsult = consultations
    .filter((c) => c.studentId === currentStudent.id)
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))[0];

  const consultLabel = myConsult
    ? new Date(myConsult.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
    : "—";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Siswa</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={TrendingUp} label="Rata-rata Nilai" value={String(myAverage)} hint="Semester berjalan" tone="purple" />
        <StatCard icon={CheckCircle2} label="Absen Hari Ini" value="Hadir" hint="06:48 • Tepat waktu" tone="emerald" />
        <StatCard
          icon={Clock}
          label="Konsul Terdekat"
          value={consultLabel}
          hint={myConsult ? myConsult.service : "Belum ada jadwal"}
          tone="amber"
        />
      </div>
      <Card className="p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Nilai per Mapel</h2>
        <div className="space-y-3">
          {top.map((g) => (
            <div key={g.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{g.mapel}</span>
                <span className="font-semibold text-slate-800">{g.nilai}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                  style={{ width: `${g.nilai}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
