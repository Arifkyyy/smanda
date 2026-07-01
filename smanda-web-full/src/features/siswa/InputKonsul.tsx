import { useMemo, useState } from 'react';
import { BadgeCheck, CalendarDays, Clock3, Edit3, Send } from 'lucide-react';
import { Card, StatusPill } from '../../components/ui';
import { useStudents } from '../../hooks/useStudents';
import { serviceTypes, bkTeachers } from '../../data/mock';
import { getConsultStatusCounts, getConsultStatusLabel, loadConsultations, saveConsultations } from '../../data/consultationStore';
import { type ConsultRow } from '../../data/mock';

type PendingKonsul = {
  id: string;
  service: string;
  teacher: string;
  note: string;
  tanggalPengajuan: string;
  status: 'Pending' | 'Dikirim';
};

function getTodayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatTanggalPengajuan(value: string) {
  const parsed = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

export default function InputKonsul() {
  const { currentStudent } = useStudents();
  const [service, setService] = useState('');
  const [teacher, setTeacher] = useState('');
  const [note, setNote] = useState('');
  const [tanggalPengajuan, setTanggalPengajuan] = useState(getTodayInputValue());
  const [pendingItems, setPendingItems] = useState<PendingKonsul[]>([]);
  const [consultations, setConsultations] = useState<ConsultRow[]>(loadConsultations());
  const [done, setDone] = useState(false);

  const pendingCount = useMemo(() => pendingItems.filter((item) => item.status === 'Pending').length, [pendingItems]);
  const studentConsultations = useMemo(() => consultations.filter((item) => item.studentId === currentStudent.id).sort((a, b) => b.tanggal.localeCompare(a.tanggal)), [consultations, currentStudent.id]);
  const consultCounts = useMemo(() => getConsultStatusCounts(studentConsultations), [studentConsultations]);

  const submit = () => {
    if (!service || !teacher || !note.trim() || !tanggalPengajuan) return;

    const nextItem: PendingKonsul = {
      id: `${Date.now()}`,
      service,
      teacher,
      note: note.trim(),
      tanggalPengajuan,
      status: 'Pending',
    };

    setPendingItems((current) => [nextItem, ...current]);
    setService('');
    setTeacher('');
    setNote('');
    setTanggalPengajuan(getTodayInputValue());
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  const editItem = (item: PendingKonsul) => {
    setService(item.service);
    setTeacher(item.teacher);
    setNote(item.note);
    setTanggalPengajuan(item.tanggalPengajuan);
    setPendingItems((current) => current.filter((entry) => entry.id !== item.id));
  };

  const sendFinal = (item: PendingKonsul) => {
    const nextConsultation: ConsultRow = {
      id: `${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.nama,
      kelas: `Kelas ${currentStudent.tingkatKelas ?? '10'}${currentStudent.rombel ?? currentStudent.kelasSiswa ?? 'A'}`,
      teacherId: `${item.teacher}`.replace(/\s+/g, '-').toLowerCase(),
      teacherName: item.teacher,
      service: item.service as ConsultRow['service'],
      catatan: item.note,
      status: 'Menunggu',
      tanggal: new Date(`${item.tanggalPengajuan}T00:00:00`).toISOString(),
    };

    setConsultations((current) => {
      const nextRows = [nextConsultation, ...current];
      saveConsultations(nextRows);
      return nextRows;
    });
    setPendingItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, status: 'Dikirim' } : entry)));
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Input Konsul</h1>
        <p className="text-slate-400 text-sm mt-1">Simpan data ke pending dulu agar bisa dicek sebelum diajukan ke Guru BK.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-6 space-y-5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
              <Clock3 size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Formulir Konsul</h2>
              <p className="text-sm text-slate-400 mt-1">Isi data di bawah, lalu cek di tabel pending sebelum dikirim final.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tanggal Pengajuan</label>
            <input
              type="date"
              value={tanggalPengajuan}
              onChange={(e) => setTanggalPengajuan(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Jenis Layanan</label>
            <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 bg-white">
              <option value="">Pilih jenis layanan…</option>
              {serviceTypes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Pilih Guru BK</label>
            <select value={teacher} onChange={(e) => setTeacher(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 bg-white">
              <option value="">Pilih guru…</option>
              {bkTeachers.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Catatan / Keluhan</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              placeholder="Ceritakan hal yang ingin dikonsultasikan…"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 resize-none"
            />
          </div>

          <button
            onClick={submit}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg shadow-sky-600/25 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
            disabled={!service || !teacher || !note.trim() || !tanggalPengajuan}
          >
            Simpan ke Pending
          </button>

          {done && (
            <p className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
              <BadgeCheck size={16} /> Data berhasil disimpan, cek dulu di tabel pending.
            </p>
          )}
        </Card>

        <Card className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Data Pending</h2>
              <p className="text-sm text-slate-400 mt-1">Daftar pengajuan yang masih bisa ditinjau dan diubah.</p>
            </div>
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-sky-100 px-2 text-sm font-bold text-sky-600">{pendingCount}</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70">
            {pendingItems.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-slate-400">Belum ada data pending. Isi form di sebelah kiri untuk menambah pengajuan.</div>
            ) : (
              <div className="divide-y divide-slate-200/80">
                {pendingItems.map((item) => (
                  <div key={item.id} className="bg-white px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.service}</p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                          <CalendarDays size={12} />
                          {formatTanggalPengajuan(item.tanggalPengajuan)}
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">{item.status}</span>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Guru BK</p>
                        <p className="mt-1 font-medium text-slate-700">{item.teacher}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Siswa</p>
                        <p className="mt-1 font-medium text-slate-700">{currentStudent.nama}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Catatan</p>
                        <p className="mt-1 rounded-xl border border-sky-100 bg-sky-50/80 px-3 py-2 text-slate-700">{item.note}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <button onClick={() => sendFinal(item)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
                        <Send size={16} />
                        Kirim Final
                      </button>
                      <button
                        onClick={() => editItem(item)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-600 transition hover:bg-sky-100"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-800">History Konsul</h2>
              <p className="text-sm text-slate-400">Riwayat pengajuan yang sudah terkirim ke admin.</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold">{studentConsultations.length}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Layanan</th>
                  <th className="px-5 py-3">Guru BK</th>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {studentConsultations.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-center text-sm text-slate-400" colSpan={5}>
                      Belum ada history konsul.
                    </td>
                  </tr>
                ) : (
                  studentConsultations.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-slate-500">{index + 1}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{item.service}</div>
                        <div className="text-xs text-slate-400">{item.catatan}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{item.teacherName}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatTanggalPengajuan(item.tanggal.slice(0, 10))}</td>
                      <td className="px-5 py-4">
                        <StatusPill status={item.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Status Konsul</h2>
            <p className="text-sm text-slate-400">Ringkasan pending, disetujui, dan ditolak dari akun ini.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  { label: 'Pending', value: consultCounts.pending, tone: 'text-amber-600 bg-amber-50 ring-amber-200' },
                  { label: 'Disetujui', value: consultCounts.approved, tone: 'text-emerald-600 bg-emerald-50 ring-emerald-200' },
                  { label: 'Ditolak', value: consultCounts.rejected, tone: 'text-rose-600 bg-rose-50 ring-rose-200' },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${row.tone}`}>{row.label}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Status Terbaru</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{studentConsultations[0] ? getConsultStatusLabel(studentConsultations[0].status) : 'Belum ada konsultasi'}</p>
            <p className="mt-2 text-sm text-slate-500">{studentConsultations[0] ? studentConsultations[0].service : 'Kirim konsul dari form di atas untuk melihat status.'}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
