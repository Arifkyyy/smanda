import { useState } from 'react';
import { Card } from '../../components/ui';
import Toolbar from '../../components/Toolbar';
import { useStudents } from '../../hooks/useStudents';

const gradeGroups = [
  { key: 'X', label: 'Kelas 10' },
  { key: 'XI', label: 'Kelas 11' },
  { key: 'XII', label: 'Kelas 12' },
];

export default function DataOrtu() {
  const [query, setQuery] = useState('');
  const { students } = useStudents();
  const search = query.toLowerCase();
  const filtered = students.filter((s) => {
    const haystack = `${s.nama} ${s.kelas} ${s.nisn}`.toLowerCase();
    return haystack.includes(search);
  });

  const groupedStudents = gradeGroups.map((group) => ({
    ...group,
    students: filtered.filter((s) => s.kelas.split(' ')[0] === group.key),
  }));

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Data Orang Tua Siswa</h1>
      <Toolbar value={query} onChange={setQuery} />

      <div className="space-y-6">
        {groupedStudents.map((group) => (
          <section key={group.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-700">{group.label}</h2>
              <span className="text-sm text-slate-500">{group.students.length} siswa</span>
            </div>

            <Card className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead className="bg-slate-50 text-slate-400 text-left">
                  <tr>
                    {['Siswa', 'NISN', 'Kelas', 'Nama Ayah', 'Nama Ibu', 'Pekerjaan', 'Penghasilan', 'No. HP'].map((h) => (
                      <th key={h} className="px-6 py-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {group.students.length ? (
                    group.students.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-3.5 font-medium text-slate-700">{s.nama}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-mono">{s.nisn}</td>
                        <td className="px-6 py-3.5">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            {s.kelas}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-500">{s.orangTua.namaAyah}</td>
                        <td className="px-6 py-3.5 text-slate-500">{s.orangTua.namaIbu}</td>
                        <td className="px-6 py-3.5 text-slate-500">{s.orangTua.pekerjaan}</td>
                        <td className="px-6 py-3.5 font-semibold text-slate-800">Rp {s.orangTua.gaji.toLocaleString('id-ID')}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-mono">{s.orangTua.noHp}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-6 text-center text-slate-500">
                        Tidak ada data untuk {group.label.toLowerCase()}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
