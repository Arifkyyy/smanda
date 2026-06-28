import { useState } from "react";
import { Camera, MapPin } from "lucide-react";
import { Card, StatusPill } from "../../components/ui";
import Toolbar from "../../components/Toolbar";
import { attendances, attendanceToday } from "../../data/mock";

export default function CekAbsensi() {
  const [query, setQuery] = useState("");

  // Show the most recent attendance day by default.
  const list = attendances
    .filter((a) => a.waktu.startsWith(attendanceToday.latest))
    .filter(
      (a) =>
        a.studentName.toLowerCase().includes(query.toLowerCase()) ||
        a.kelas.toLowerCase().includes(query.toLowerCase())
    );

  const dateLabel = new Date(attendanceToday.latest).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Cek Absensi</h1>
        <p className="text-slate-400 text-sm mt-1">
          {dateLabel} • {attendanceToday.present.length} siswa hadir ({attendanceToday.pct}%)
        </p>
      </div>
      <Toolbar value={query} onChange={setQuery} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((a) => {
          const initials = a.studentName.split(" ").map((n) => n[0]).join("");
          const jam = new Date(a.waktu).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <Card key={a.id} className="p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{a.studentName}</p>
                  <p className="text-xs text-slate-400">
                    {a.kelas} • {jam}
                  </p>
                </div>
              </div>
              <div className="mt-4 aspect-video rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 text-xs overflow-hidden">
                <Camera size={20} className="mr-2 opacity-50" /> Foto wajah
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-mono">
                  <MapPin size={13} className="text-purple-600" /> {a.lat.toFixed(4)}, {a.lng.toFixed(4)}
                </span>
                <StatusPill status={a.status} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
