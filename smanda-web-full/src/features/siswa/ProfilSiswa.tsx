import { useEffect, useState } from 'react';
import { BookOpen, Mail, Phone, Save, UserRound } from 'lucide-react';
import { Card } from '../../components/ui';
import { useStudents } from '../../hooks/useStudents';

const statusOptions = ['bersama', 'bercerai', 'wafat'] as const;
const levelOptions = ['10', '11', '12'] as const;
const classOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const;
const semesterOptions = ['1', '2'] as const;

export default function ProfilSiswa() {
  const { currentStudent, updateCurrentStudent } = useStudents();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    nisn: '',
    email: '',
    tingkatKelas: '10',
    rombel: 'A',
    semester: '1',
    namaAyah: '',
    namaIbu: '',
    pekerjaanAyah: '',
    pekerjaanIbu: '',
    gajiAyah: '',
    gajiIbu: '',
    status: 'bersama',
    noHp: '',
  });

  useEffect(() => {
    setForm({
      nama: currentStudent.nama,
      nisn: currentStudent.nisn,
      email: currentStudent.email,
      tingkatKelas: currentStudent.tingkatKelas ?? '10',
      rombel: currentStudent.rombel ?? currentStudent.kelasSiswa ?? 'A',
      semester: currentStudent.semester ?? '1',
      namaAyah: currentStudent.orangTua.namaAyah,
      namaIbu: currentStudent.orangTua.namaIbu,
      pekerjaanAyah: currentStudent.orangTua.pekerjaanAyah ?? currentStudent.orangTua.pekerjaan,
      pekerjaanIbu: currentStudent.orangTua.pekerjaanIbu ?? '',
      gajiAyah: String(currentStudent.orangTua.gajiAyah ?? currentStudent.orangTua.gaji),
      gajiIbu: String(currentStudent.orangTua.gajiIbu ?? 0),
      status: currentStudent.orangTua.status ?? 'bersama',
      noHp: currentStudent.orangTua.noHp,
    });
  }, [currentStudent]);

  const initials = currentStudent.nama
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const profileSummary = [
    { label: 'Nama Lengkap', value: currentStudent.nama, icon: UserRound },
    { label: 'NISN', value: currentStudent.nisn, icon: UserRound },
    { label: 'Email', value: currentStudent.email, icon: Mail },
    { label: 'Tingkat Kelas', value: currentStudent.tingkatKelas ?? '10', icon: BookOpen },
    { label: 'Rombel', value: currentStudent.rombel ?? currentStudent.kelasSiswa ?? 'A', icon: BookOpen },
    { label: 'Semester', value: currentStudent.semester ?? '1', icon: BookOpen },
  ];

  const parentSummary = [
    { label: 'Nama Ayah', value: currentStudent.orangTua.namaAyah },
    { label: 'Nama Ibu', value: currentStudent.orangTua.namaIbu },
    { label: 'Pekerjaan Ayah', value: currentStudent.orangTua.pekerjaanAyah ?? currentStudent.orangTua.pekerjaan },
    { label: 'Pekerjaan Ibu', value: currentStudent.orangTua.pekerjaanIbu ?? '-' },
    { label: 'Gaji Ayah', value: `Rp ${(currentStudent.orangTua.gajiAyah ?? currentStudent.orangTua.gaji).toLocaleString('id-ID')} / bulan` },
    { label: 'Gaji Ibu', value: `Rp ${(currentStudent.orangTua.gajiIbu ?? 0).toLocaleString('id-ID')} / bulan` },
    { label: 'Status Orang Tua', value: currentStudent.orangTua.status ?? 'bersama' },
    { label: 'No. HP Orang Tua', value: currentStudent.orangTua.noHp, icon: Phone },
  ];

  const handleChange = (key: keyof typeof form, value: string) => {
    setSaved(false);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateCurrentStudent({
      nama: form.nama,
      nisn: form.nisn,
      email: form.email,
      tingkatKelas: form.tingkatKelas,
      rombel: form.rombel,
      kelasSiswa: form.rombel,
      semester: form.semester,
      orangTua: {
        namaAyah: form.namaAyah,
        namaIbu: form.namaIbu,
        pekerjaan: form.pekerjaanAyah,
        gaji: Number(form.gajiAyah) || 0,
        pekerjaanAyah: form.pekerjaanAyah,
        pekerjaanIbu: form.pekerjaanIbu,
        gajiAyah: Number(form.gajiAyah) || 0,
        gajiIbu: Number(form.gajiIbu) || 0,
        status: form.status,
        noHp: form.noHp,
      },
    });

    setSaved(true);
  };

  const renderInput = (label: string, key: keyof typeof form, icon: React.ReactNode, value: string) => (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/15">
        <span className="shrink-0 text-slate-400">{icon}</span>
        <input value={value} onChange={(e) => handleChange(key, e.target.value)} className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none" />
      </div>
    </label>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Profil Siswa</h1>
        <p className="mt-1 text-sm text-slate-500">Informasi data diri dan orang tua siswa bisa diedit dan otomatis terbaca oleh admin.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-violet-600 text-2xl font-extrabold text-white shadow-lg shadow-slate-200">{initials}</div>
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-slate-800">{currentStudent.nama}</h2>
              <p className="mt-1 text-sm text-slate-500">@{currentStudent.nama.toLowerCase().replace(/\s+/g, '')}</p>
              <p className="mt-1 text-sm text-slate-500">Peserta Didik</p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">Aktif</span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-violet-200">
                Kelas {currentStudent.tingkatKelas ?? '10'}
                {currentStudent.rombel ?? currentStudent.kelasSiswa ?? 'A'} • Semester {currentStudent.semester ?? '1'}
              </span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 ring-1 ring-sky-200">Siswa</span>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status Akun</span>
                  <span className="font-semibold text-emerald-600">Aktif</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tingkat Kelas</span>
                  <span className="font-semibold text-violet-600">{currentStudent.tingkatKelas ?? '10'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Rombel</span>
                  <span className="font-semibold text-violet-600">{currentStudent.rombel ?? currentStudent.kelasSiswa ?? 'A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Semester</span>
                  <span className="font-semibold text-violet-600">{currentStudent.semester ?? '1'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sinkron Admin</span>
                  <span className="font-semibold text-sky-600">Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSave}>
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Informasi Pribadi</h2>
                <p className="mt-1 text-sm text-slate-500">Ubah data pribadi di bawah ini lalu simpan.</p>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${saved ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 'bg-slate-100 text-slate-500'}`}>{saved ? 'Tersimpan' : 'Belum disimpan'}</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {renderInput('Nama Lengkap', 'nama', <UserRound size={16} />, form.nama)}
              {renderInput('NISN', 'nisn', <UserRound size={16} />, form.nisn)}
              {renderInput('Email', 'email', <Mail size={16} />, form.email)}
              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Kelas Siswa</span>
                <div className="grid gap-3 md:grid-cols-3">
                  <select
                    value={form.tingkatKelas}
                    onChange={(e) => handleChange('tingkatKelas', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15"
                  >
                    {levelOptions.map((option) => (
                      <option key={option} value={option}>
                        Kelas {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.rombel}
                    onChange={(e) => handleChange('rombel', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15"
                  >
                    {classOptions.map((option) => (
                      <option key={option} value={option}>
                        Rombel {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.semester}
                    onChange={(e) => handleChange('semester', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15"
                  >
                    {semesterOptions.map((option) => (
                      <option key={option} value={option}>
                        Semester {option}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-800">Data Orang Tua</h3>
                <p className="mt-1 text-sm text-slate-500">Data ini juga akan terlihat di panel admin.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {renderInput('Nama Ayah', 'namaAyah', <UserRound size={16} />, form.namaAyah)}
                {renderInput('Nama Ibu', 'namaIbu', <UserRound size={16} />, form.namaIbu)}
                {renderInput('Pekerjaan Ayah', 'pekerjaanAyah', <UserRound size={16} />, form.pekerjaanAyah)}
                {renderInput('Pekerjaan Ibu', 'pekerjaanIbu', <UserRound size={16} />, form.pekerjaanIbu)}
                {renderInput('Gaji Ayah', 'gajiAyah', <UserRound size={16} />, form.gajiAyah)}
                {renderInput('Gaji Ibu', 'gajiIbu', <UserRound size={16} />, form.gajiIbu)}
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Status Orang Tua</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/15">
                    <span className="shrink-0 text-slate-400">
                      <UserRound size={16} />
                    </span>
                    <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none">
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                {renderInput('No. HP Orang Tua', 'noHp', <Phone size={16} />, form.noHp)}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-400">Perubahan disimpan ke penyimpanan lokal dan langsung terbaca di menu admin.</p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:shadow-violet-700/30 active:translate-y-0"
              >
                <Save size={16} />
                Simpan Perubahan
              </button>
            </div>
          </Card>
        </form>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-800">Ringkasan Data Tersimpan</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {profileSummary.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                <Icon size={14} className="text-slate-400" />
                {label}
              </div>
              <p className="text-sm font-semibold text-slate-700">{value}</p>
            </div>
          ))}
          {parentSummary.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                {Icon ? <Icon size={14} className="text-slate-400" /> : null}
                {label}
              </div>
              <p className="text-sm font-semibold text-slate-700">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
