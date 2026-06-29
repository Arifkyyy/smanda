import { useState } from 'react';
import { Card } from '../../components/ui';
import Toolbar from '../../components/Toolbar';
import { useStudents } from '../../hooks/useStudents';

export default function DataOrtu() {
  const [query, setQuery] = useState('');
  const { students } = useStudents();
  const filtered = students.filter((s) => s.nama.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Data Orang Tua Siswa</h1>
      <Toolbar value={query} onChange={setQuery} />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead className="bg-slate-50 text-slate-400 text-left">
            <tr>
              {['Siswa', 'NISN', 'Nama Ayah', 'Nama Ibu', 'Pekerjaan', 'Penghasilan', 'No. HP'].map((h) => (
                <th key={h} className="px-6 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-700">{s.nama}</td>
                <td className="px-6 py-3.5 text-slate-500 font-mono">{s.nisn}</td>
                <td className="px-6 py-3.5 text-slate-500">{s.orangTua.namaAyah}</td>
                <td className="px-6 py-3.5 text-slate-500">{s.orangTua.namaIbu}</td>
                <td className="px-6 py-3.5 text-slate-500">{s.orangTua.pekerjaan}</td>
                <td className="px-6 py-3.5 font-semibold text-slate-800">Rp {s.orangTua.gaji.toLocaleString('id-ID')}</td>
                <td className="px-6 py-3.5 text-slate-500 font-mono">{s.orangTua.noHp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
