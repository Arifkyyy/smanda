import { useState } from 'react';
import { Card, StatusPill } from '../../components/ui';
import Toolbar from '../../components/Toolbar';
import { grades } from '../../data/mock';

const classLevels = ['Semua', 'X', 'XI', 'XII'] as const;
const semesterLevels = ['Semua', '1', '2'] as const;

function getClassLevel(kelas: string) {
  if (kelas.startsWith('XII')) return 'XII';
  if (kelas.startsWith('XI')) return 'XI';
  if (kelas.startsWith('X')) return 'X';
  return 'Semua';
}

function getSemesterLevel(semester: string) {
  if (/ganjil/i.test(semester) || /semester\s*1/i.test(semester)) return '1';
  if (/genap/i.test(semester) || /semester\s*2/i.test(semester)) return '2';
  return 'Semua';
}

export default function DataNilai() {
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState<(typeof classLevels)[number]>('Semua');
  const [semesterFilter, setSemesterFilter] = useState<(typeof semesterLevels)[number]>('Semua');

  const filtered = grades
    .filter((g) => g.studentName.toLowerCase().includes(query.toLowerCase()) || g.kelas.toLowerCase().includes(query.toLowerCase()))
    .filter((g) => {
      const classLevel = getClassLevel(g.kelas);
      const semesterLevel = getSemesterLevel(g.semester);

      const matchClass = classFilter === 'Semua' || classLevel === classFilter;
      const matchSemester = semesterFilter === 'Semua' || semesterLevel === semesterFilter;

      return matchClass && matchSemester;
    });

  const classCounts = classLevels.map((level) => ({
    level,
    count: level === 'Semua' ? grades.length : grades.filter((g) => getClassLevel(g.kelas) === level).length,
  }));

  const semesterCounts = semesterLevels.map((level) => ({
    level,
    count: level === 'Semua' ? grades.length : grades.filter((g) => getSemesterLevel(g.semester) === level).length,
  }));

  const selectedSummary = `${classFilter === 'Semua' ? 'Semua kelas' : `Kelas ${classFilter}`} • ${semesterFilter === 'Semua' ? 'Semua semester' : `Semester ${semesterFilter}`}`;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Data Nilai Siswa</h1>
      <div className="space-y-4">
        <Toolbar value={query} onChange={setQuery} placeholder="Cari nama atau kelas…" />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Filter Kelas</p>
              <p className="text-xs text-slate-400">X / XI / XII</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {classCounts.map(({ level, count }) => (
                <button
                  key={level}
                  onClick={() => setClassFilter(level)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    classFilter === level ? 'bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-md shadow-violet-700/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {level === 'Semua' ? 'Semua' : `Kelas ${level}`} <span className="ml-1 text-xs opacity-80">({count})</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Filter Semester</p>
              <p className="text-xs text-slate-400">1 / 2</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {semesterCounts.map(({ level, count }) => (
                <button
                  key={level}
                  onClick={() => setSemesterFilter(level)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    semesterFilter === level ? 'bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-md shadow-violet-700/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {level === 'Semua' ? 'Semua' : `Semester ${level}`} <span className="ml-1 text-xs opacity-80">({count})</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-slate-700">Ringkasan Tampilan</p>
            <p className="text-xs text-slate-500">{selectedSummary}</p>
          </div>
          <div className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-violet-200">{filtered.length} data</div>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead className="bg-slate-50 text-slate-400 text-left">
            <tr>
              {['Nama', 'Kelas', 'Semester', 'Mapel', 'Nilai', 'Status', 'Aksi'].map((h) => (
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
                <td className="px-6 py-3.5 text-slate-500">{r.semester}</td>
                <td className="px-6 py-3.5 text-slate-500">{r.mapel}</td>
                <td className="px-6 py-3.5 font-semibold text-slate-800">{r.nilai}</td>
                <td className="px-6 py-3.5">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-6 py-3.5">
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100">Validasi</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
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
