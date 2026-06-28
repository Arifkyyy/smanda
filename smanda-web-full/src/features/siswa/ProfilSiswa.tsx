import { Card, Field } from "../../components/ui";
import { currentStudent } from "../../data/mock";

export default function ProfilSiswa() {
  const { nama, nisn, email, kelas, orangTua } = currentStudent;
  const gaji = `Rp ${orangTua.gaji.toLocaleString("id-ID")} / bulan`;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-800">Profil Siswa</h1>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-1 rounded bg-gradient-to-b from-purple-600 to-indigo-600" />
          <h2 className="font-semibold text-slate-800">Data Pribadi</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nama Lengkap" value={nama} />
          <Field label="NISN" value={nisn} />
          <Field label="Email" value={email} />
          <Field label="Kelas" value={kelas} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-1 rounded bg-gradient-to-b from-purple-600 to-indigo-600" />
          <h2 className="font-semibold text-slate-800">Data Orang Tua</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nama Ayah" value={orangTua.namaAyah} />
          <Field label="Nama Ibu" value={orangTua.namaIbu} />
          <Field label="Pekerjaan" value={orangTua.pekerjaan} />
          <Field label="Penghasilan" value={gaji} />
          <Field label="No. HP Orang Tua" value={orangTua.noHp} />
        </div>
      </Card>
    </div>
  );
}
