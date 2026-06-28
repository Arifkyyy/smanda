import { useState } from "react";
import { Card, StatusPill } from "../../components/ui";
import Toolbar from "../../components/Toolbar";
import { consultations, type ConsultRow } from "../../data/mock";

export default function CekKonsul() {
  const [rows, setRows] = useState<ConsultRow[]>(consultations);
  const [query, setQuery] = useState("");

  const setStatus = (id: string, status: ConsultRow["status"]) =>
    setRows((rs) => rs.map((x) => (x.id === id ? { ...x, status } : x)));

  const filtered = rows.filter((r) =>
    r.studentName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Cek Konsul</h1>
      <Toolbar value={query} onChange={setQuery} />
      <div className="space-y-3">
        {filtered.map((r) => {
          const initials = r.studentName.split(" ").map((n) => n[0]).join("");
          const tgl = new Date(r.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          return (
            <Card key={r.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-semibold shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800">
                  {r.studentName}{" "}
                  <span className="text-slate-400 font-normal text-sm">• {r.kelas}</span>
                </p>
                <p className="text-sm text-slate-500">
                  {r.service} → {r.teacherName}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {tgl} — {r.catatan}
                </p>
              </div>
              <StatusPill status={r.status} />
              {r.status === "Menunggu" && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setStatus(r.id, "Disetujui")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold"
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() => setStatus(r.id, "Ditolak")}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50"
                  >
                    Tolak
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
