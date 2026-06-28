import { useState } from "react";
import { Card, StatusPill } from "../../components/ui";
import Toolbar from "../../components/Toolbar";
import { grades } from "../../data/mock";

export default function DataNilai() {
  const [query, setQuery] = useState("");
  const filtered = grades.filter(
    (g) =>
      g.studentName.toLowerCase().includes(query.toLowerCase()) ||
      g.kelas.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Data Nilai Siswa</h1>
      <Toolbar value={query} onChange={setQuery} />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead className="bg-slate-50 text-slate-400 text-left">
            <tr>
              {["Nama", "Kelas", "Mapel", "Nilai", "Status", "Aksi"].map((h) => (
                <th key={h} className="px-6 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-700">{r.studentName}</td>
                <td className="px-6 py-3.5 text-slate-500">{r.kelas}</td>
                <td className="px-6 py-3.5 text-slate-500">{r.mapel}</td>
                <td className="px-6 py-3.5 font-semibold text-slate-800">{r.nilai}</td>
                <td className="px-6 py-3.5">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-6 py-3.5">
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100">
                    Validasi
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                  Tidak ada nilai yang cocok dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
