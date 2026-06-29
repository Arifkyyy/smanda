import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, UserRound } from 'lucide-react';
import type { Role } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import Brand from '../../components/Brand';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('siswa');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = () => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/siswa');
  };

  const schoolImage = '../../../public/login-school.jpeg';

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* Left panel: school image area (replace source with your school photo later) */}
      <div className="relative hidden lg:flex overflow-hidden">
        <img src={schoolImage} alt="Foto lingkungan sekolah" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-800/90 via-purple-700/80 to-slate-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,181,253,0.28),transparent_48%),radial-gradient(circle_at_85%_80%,rgba(168,85,247,0.24),transparent_52%)]" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12 text-white">
          <Brand light />
          <div>
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-violet-100">PORTAL AKADEMIK SISWA</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-tight">
              Bimbingan Konseling
              <br />
              <span className="text-violet-300">SMAN 2 Cianjur</span>
            </h1>
            <p className="mt-5 max-w-md text-sm text-cyan-50/85">
              Area kiri ini disiapkan untuk foto sekolah. Ganti sumber gambar pada variabel
              <span className="font-semibold"> schoolImage</span> di file ini.
            </p>
          </div>
          <p className="text-xs text-cyan-100/70">© 2026 SMA Negeri 2 Cianjur</p>
        </div>
      </div>

      {/* Right panel: login form */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-xl shadow-slate-200/70 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center text-center mb-8">
            <img src="/logo-smanda.png" alt="Logo SMAN 2 Cianjur" className="h-16 w-16 object-contain drop-shadow" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Selamat Datang</p>
            <h2 className="mt-2 text-4xl font-extrabold leading-tight text-slate-900">Masuk ke Akun Anda</h2>
            <p className="text-slate-500 text-sm mt-2">Gunakan email atau nama untuk masuk</p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
            {(['siswa', 'admin'] as Role[]).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`py-2 rounded-lg text-sm font-semibold capitalize transition-all ${role === r ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500'}`}>
                {r}
              </button>
            ))}
          </div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">Email / Nama</label>
          <div className="relative mb-4">
            <UserRound size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="email@example.com atau nama"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
            <a className="cursor-pointer text-xs text-violet-700 hover:underline">Lupa Password?</a>
          </div>
          <div className="relative mb-7">
            <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
            <button onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-600 py-3 text-base font-bold text-white shadow-lg shadow-violet-700/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-700/35 active:translate-y-0"
          >
            <ArrowRight size={18} />
            Masuk sebagai {role === 'siswa' ? 'Siswa' : 'Admin'}
          </button>

          <p className="text-center text-xs text-slate-400 mt-8">Pilih peran di atas untuk demo — kredensial tidak divalidasi.</p>
        </div>
      </div>
    </div>
  );
}
