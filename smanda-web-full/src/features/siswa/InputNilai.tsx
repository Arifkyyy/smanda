import { useEffect, useMemo, useState } from 'react';
import { Pencil, Save } from 'lucide-react';
import { Card, StatusPill } from '../../components/ui';
import { createInitialGradeBook, gradeBookKey, loadGradeBook, saveGradeBook, subjectByLevel, type GradeLevel, type Semester, type GradeRow, type GradeBook } from '../../data/gradebook';

export default function InputNilai() {
  const [gradeClass, setGradeClass] = useState<GradeLevel>('10');
  const [semester, setSemester] = useState<Semester>('1');
  const [records, setRecords] = useState<GradeBook>(createInitialGradeBook);
  const [editing, setEditing] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRecords(loadGradeBook());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveGradeBook(records);
  }, [records, hydrated]);

  const activeKey = gradeBookKey(gradeClass, semester);
  const rows =
    records[activeKey] ??
    subjectByLevel[gradeClass].map(
      (mapel, index) =>
        ({
          id: `${gradeClass}-${semester}-${index}`,
          mapel,
          nilai: 0,
          status: 'Menunggu' as const,
        }) satisfies GradeRow,
    );

  const summaryText = useMemo(() => `Kelas ${gradeClass} Semester ${semester}`, [gradeClass, semester]);

  const isSubmitted = rows.every((row) => row.status === 'Complete');

  const updateRow = (id: string, nilai: number) => {
    setRecords((current) => ({
      ...current,
      [activeKey]: current[activeKey].map((row) => (row.id === id ? { ...row, nilai, status: 'Menunggu' } : row)),
    }));
  };

  const submitAll = () => {
    setRecords((current) => ({
      ...current,
      [activeKey]: current[activeKey].map((row) => ({ ...row, status: 'Complete' })),
    }));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Input Nilai</h1>
        <p className="mt-1 text-sm text-slate-400">Pilih kelas dan semester, lalu simpan nilai ke data yang akan tampil di dashboard.</p>
      </div>

      <Card className="p-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Kelas</span>
            <select
              value={gradeClass}
              onChange={(e) => {
                setGradeClass(e.target.value as GradeLevel);
                setEditing(null);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="10">Kelas 10</option>
              <option value="11">Kelas 11</option>
              <option value="12">Kelas 12</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Semester</span>
            <select
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value as Semester);
                setEditing(null);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 to-sky-50 px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Kombinasi aktif</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{summaryText}</p>
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">{rows.length} mata pelajaran</div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Daftar Nilai {summaryText}</h2>
          <p className="mt-1 text-sm text-slate-400">
            Status akan tetap <span className="font-semibold text-amber-600">Menunggu</span> sampai kamu submit semua nilai.
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-400">
            <tr>
              <th className="px-6 py-3 font-medium">Mata Pelajaran</th>
              <th className="px-6 py-3 font-medium">Nilai</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-700">{row.mapel}</td>
                <td className="px-6 py-3.5">
                  {editing === row.id ? (
                    <input
                      autoFocus
                      type="number"
                      min={0}
                      max={100}
                      value={row.nilai}
                      onChange={(e) => updateRow(row.id, Number(e.target.value))}
                      className="w-20 rounded-lg border border-purple-300 px-2 py-1 outline-none focus:ring-2 focus:ring-purple-500/40"
                    />
                  ) : (
                    <span className="font-semibold text-slate-800">{row.nilai}</span>
                  )}
                </td>
                <td className="px-6 py-3.5">
                  <StatusPill status={row.status} />
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button onClick={() => setEditing(editing === row.id ? null : row.id)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-purple-600 hover:bg-purple-50">
                    {editing === row.id ? (
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

        <div className="border-t border-slate-100 px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{isSubmitted ? 'Complete' : 'Menunggu'}</span> untuk {rows.length} mata pelajaran pada kombinasi aktif.
            </div>
            <button
              onClick={submitAll}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:shadow-emerald-600/30 active:translate-y-0"
            >
              <Save size={16} />
              Submit Semua Nilai
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
