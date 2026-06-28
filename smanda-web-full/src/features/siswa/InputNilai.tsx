import { useState } from "react";
import { Pencil, Save } from "lucide-react";
import { Card, StatusPill } from "../../components/ui";
import { myGrades } from "../../data/mock";

interface Row {
  id: string;
  mapel: string;
  nilai: number;
  status: string;
}

export default function InputNilai() {
  const [rows, setRows] = useState<Row[]>(
    myGrades.map((g) => ({ id: g.id, mapel: g.mapel, nilai: g.nilai, status: g.status }))
  );
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Input Nilai</h1>
        <p className="text-slate-400 text-sm mt-1">
          Masukkan dan perbarui nilai tiap mata pelajaran secara mandiri.
        </p>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 text-left">
            <tr>
              <th className="px-6 py-3 font-medium">Mata Pelajaran</th>
              <th className="px-6 py-3 font-medium">Nilai</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-700">{r.mapel}</td>
                <td className="px-6 py-3.5">
                  {editing === r.id ? (
                    <input
                      autoFocus
                      type="number"
                      min={0}
                      max={100}
                      value={r.nilai}
                      onChange={(e) =>
                        setRows((rs) =>
                          rs.map((x) => (x.id === r.id ? { ...x, nilai: Number(e.target.value) } : x))
                        )
                      }
                      className="w-20 rounded-lg border border-purple-300 px-2 py-1 outline-none focus:ring-2 focus:ring-purple-500/40"
                    />
                  ) : (
                    <span className="font-semibold text-slate-800">{r.nilai}</span>
                  )}
                </td>
                <td className="px-6 py-3.5">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button
                    onClick={() => setEditing(editing === r.id ? null : r.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-purple-600 hover:bg-purple-50"
                  >
                    {editing === r.id ? (
                      <>
                        <Save size={14} /> Simpan
                      </>
                    ) : (
                      <>
                        <Pencil size={14} /> Edit
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
