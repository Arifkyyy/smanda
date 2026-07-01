import { BookOpen, CheckCircle2, Clock3, GraduationCap, Mail, MapPin, TrendingUp, UserRound } from 'lucide-react';
import { Card, StatCard, StatusPill } from '../../components/ui';
import { consultations, attendances } from '../../data/mock';
import { createRows, gradeBookKey, loadGradeBook, type GradeLevel, type Semester } from '../../data/gradebook';
import { useStudents } from '../../hooks/useStudents';

export default function DashboardSiswa() {
  const { currentStudent } = useStudents();
  const activeLevel = (currentStudent.tingkatKelas ?? '10') as GradeLevel;
  const activeRombel = currentStudent.rombel ?? currentStudent.kelasSiswa ?? 'A';
  const activeSemester = (currentStudent.semester ?? '1') as Semester;
  const activeKey = gradeBookKey(activeLevel, activeSemester);
  const gradeBook = loadGradeBook();
  const activeGrades = gradeBook[activeKey] ?? createRows(activeLevel, activeSemester);
  const topGrades = [...activeGrades].sort((a, b) => b.nilai - a.nilai).slice(0, 4);
  const latestConsult = consultations.filter((consult) => consult.studentId === currentStudent.id).sort((a, b) => b.tanggal.localeCompare(a.tanggal))[0];
  const latestAttendance = attendances.filter((attendance) => attendance.studentId === currentStudent.id).sort((a, b) => b.waktu.localeCompare(a.waktu))[0];

  const attendanceLabel = latestAttendance
    ? new Date(latestAttendance.waktu).toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    : 'Belum ada data';

  const consultLabel = latestConsult ? new Date(latestConsult.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Belum ada jadwal';

  const average = activeGrades.length ? Math.round((activeGrades.reduce((sum, grade) => sum + grade.nilai, 0) / activeGrades.length) * 10) / 10 : 0;
  const gradeCompletion = activeGrades.length ? Math.round((activeGrades.filter((grade) => grade.status === 'Complete').length / activeGrades.length) * 100) : 0;

  const profileItems = [
    { label: 'Nama', value: currentStudent.nama, icon: UserRound },
    { label: 'NISN', value: currentStudent.nisn, icon: GraduationCap },
    { label: 'Kelas', value: `Kelas ${activeLevel}${activeRombel}`, icon: BookOpen },
    { label: 'Semester', value: `Semester ${activeSemester}`, icon: BookOpen },
    { label: 'Email', value: currentStudent.email, icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 px-6 py-6 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">Dashboard Siswa</p>
                <h1 className="mt-2 text-2xl font-bold">Selamat datang, {currentStudent.nama.split(' ')[0]}</h1>
                <p className="mt-2 max-w-xl text-sm text-white/85">Ringkasan data belajar, absensi, dan konsultasi yang langsung terhubung dengan akun siswa aktif.</p>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Status Akun</p>
                <p className="mt-1 text-lg font-bold">Aktif</p>
                <p className="text-xs text-white/70">
                  Kelas {activeLevel}
                  {activeRombel} • Semester {activeSemester}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {profileItems.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <Icon size={14} className="text-slate-400" />
                    {label}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-700">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <StatCard icon={TrendingUp} label={`Rata-rata Kelas ${activeLevel}${activeRombel}`} value={String(average)} hint={`Semester ${activeSemester}`} tone="purple" />
              <StatCard icon={CheckCircle2} label="Nilai Tervalidasi" value={`${gradeCompletion}%`} hint={`${activeGrades.length} mapel aktif`} tone="emerald" />
              <StatCard icon={Clock3} label="Konsul Terdekat" value={consultLabel} hint={latestConsult ? latestConsult.service : 'Belum ada jadwal'} tone="amber" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Ringkasan Hari Ini</h2>
            <p className="mt-1 text-sm text-slate-400">Satu ringkasan singkat untuk absensi, konsultasi, dan kontak.</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Absensi Terakhir</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{attendanceLabel}</p>
              </div>
              <StatusPill status={latestAttendance?.status ?? 'Menunggu'} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} className="text-sky-500" />
              {latestAttendance ? `${latestAttendance.lat.toFixed(3)}, ${latestAttendance.lng.toFixed(3)}` : 'Lokasi belum tersedia'}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Konsultasi Terakhir</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{latestConsult ? latestConsult.service : 'Belum ada pengajuan'}</p>
            <p className="mt-2 text-sm text-slate-500">{latestConsult ? latestConsult.catatan : 'Silakan buat pengajuan konsul dari menu Input Konsul.'}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Kontak</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{currentStudent.email}</p>
            <p className="mt-2 text-xs text-slate-500">Data orang tua ada di menu profil dan terbaca oleh admin.</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Nilai Kelas {activeLevel}
                {activeRombel}
              </h2>
              <p className="mt-1 text-sm text-slate-400">Nilai pada Semester {activeSemester} sesuai data yang tersimpan di profil dan input nilai.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{activeGrades.length} mapel</span>
          </div>

          <div className="space-y-4">
            {topGrades.map((grade) => (
              <div key={grade.id} className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{grade.mapel}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {activeLevel}
                      {activeRombel} • Semester {activeSemester}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{grade.nilai}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${grade.nilai}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
