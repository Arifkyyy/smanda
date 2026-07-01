import { useState } from 'react';
import { Card, StatusPill } from '../../components/ui';
import Toolbar from '../../components/Toolbar';
import { consultations, type ConsultRow } from '../../data/mock';

export default function CekKonsul() {
  const [rows, setRows] = useState<ConsultRow[]>(consultations);
  const [query, setQuery] = useState('');

  const setStatus = (id: string, status: ConsultRow['status']) => setRows((rs) => rs.map((x) => (x.id === id ? { ...x, status } : x)));

  const filtered = rows.filter((r) => r.status === 'Menunggu').filter((r) => [r.studentName, r.kelas, r.service, r.teacherName, r.catatan].join(' ').toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cek Konsul</h1>
          <p className="text-sm text-slate-400 mt-1">Data pending konsultasi yang belum ditindaklanjuti.</p>
        </div>
        <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200">Pending {filtered.length}</div>
      </div>
      <Toolbar value={query} onChange={setQuery} />
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Data Pending</h2>
            <p className="text-sm text-slate-400">Data yang belum disetujui.</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold">{filtered.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">No</th>
                <th className="px-5 py-3">Nama Siswa</th>
                <th className="px-5 py-3">Kelas</th>
                <th className="px-5 py-3">Layanan</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm text-slate-400" colSpan={7}>
                    Tidak ada data pending yang sesuai pencarian.
                  </td>
                </tr>
              ) : (
                filtered.map((r, index) => {
                  const tgl = new Date(r.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-slate-500">{index + 1}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{r.studentName}</div>
                        <div className="text-xs text-slate-400">{r.catatan}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{r.kelas}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <div>{r.service}</div>
                        <div className="text-xs text-slate-400">{r.teacherName}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{tgl}</td>
                      <td className="px-5 py-4">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setStatus(r.id, 'Disetujui')} className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5">
                            Setujui
                          </button>
                          <button onClick={() => setStatus(r.id, 'Ditolak')} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50">
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
