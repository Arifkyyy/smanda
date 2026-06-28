import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Card } from "../../components/ui";
import { serviceTypes, bkTeachers } from "../../data/mock";

export default function InputKonsul() {
  const [service, setService] = useState("");
  const [teacher, setTeacher] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Input Konsul</h1>
        <p className="text-slate-400 text-sm mt-1">Jadwalkan sesi bimbingan dengan Guru BK.</p>
      </div>
      <Card className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Jenis Layanan</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 bg-white"
          >
            <option value="">Pilih jenis layanan…</option>
            {serviceTypes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Pilih Guru BK</label>
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 bg-white"
          >
            <option value="">Pilih guru…</option>
            {bkTeachers.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Catatan / Keluhan</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="Ceritakan hal yang ingin dikonsultasikan…"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 resize-none"
          />
        </div>
        <button
          onClick={submit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-600/25 hover:-translate-y-0.5 transition-all"
        >
          Ajukan Jadwal Konsul
        </button>
        {done && (
          <p className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
            <BadgeCheck size={16} /> Pengajuan terkirim, menunggu persetujuan.
          </p>
        )}
      </Card>
    </div>
  );
}
