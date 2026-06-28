# SMAN 2 Cianjur — Portal Akademik

Aplikasi web sekolah (multi-role: Siswa & Admin) dibangun dengan **Vite + React + TypeScript (strict) + Tailwind CSS**.

## Menjalankan

Butuh **Node.js 18+**.

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

## Build untuk produksi

```bash
npm run build
npm run preview
```

## Cara pakai

Di halaman login, pilih peran **Siswa** atau **Admin** lalu klik tombol masuk.
Kredensial tidak divalidasi (mode demo) — sistem langsung redirect ke dashboard sesuai peran.

- **Siswa:** Dashboard, Profil, Input Nilai, Input Konsul, Absen (kamera + GPS)
- **Admin:** Dashboard, Data Nilai, Cek Absensi, Data Ortu, Cek Konsul

> Fitur Absen menggunakan API kamera & geolokasi browser. Browser akan meminta izin;
> jika ditolak, koordinat memakai fallback lokasi SMAN 2 Cianjur.

## Struktur

```
src/
├── types/         # Interface TypeScript (Role, StudentProfile, Konsul, Absensi…)
├── data/          # Data dummy
├── components/    # Brand, Toolbar, ui/ (Card, StatCard, StatusPill, Field)
├── layouts/       # DashboardShell (sidebar + header)
├── features/
│   ├── auth/      # Login
│   ├── siswa/     # halaman role siswa
│   └── admin/     # halaman role admin
└── hooks/         # useAuth (context), ProtectedRoute
```

## Menghubungkan ke backend

- Ganti logika `useAuth` (`src/hooks/useAuth.tsx`) dengan panggilan API + token nyata.
- Ganti data di `src/data/mock.ts` dengan fetch dari API.
- Pada `Absen.tsx`, capture frame video ke `<canvas>` → `toDataURL()` lalu kirim
  bersama koordinat ke server.

Logo resmi ada di `public/logo-smanda.png` dan dipakai di login serta sidebar.

## Data dummy

Semua halaman kini memakai data dummy yang strukturnya **cocok dengan koleksi
MongoDB** (lihat paket `smanda-mongodb-seed`). Ada di `src/data/mock.ts`:

- `students` — 12 siswa + data orang tua
- `grades` — 77 nilai (relasi ke siswa, sudah di-join nama & kelas)
- `consultations` — 8 pengajuan konsul (relasi siswa + guru BK)
- `attendances` — 33 absensi 3 hari terakhir (foto + koordinat)
- helper turunan: `myGrades`, `myAverage`, `totalStudents`, `pendingConsults`,
  `attendanceToday`

Siswa yang "login" pada mode demo adalah `currentStudent` (record pertama).
Saat menyambung ke backend, ganti array-array ini dengan respons API — bentuk
field-nya sudah dibuat sama dengan dokumen MongoDB (cukup join `studentId`/
`teacherId` di server, atau kirim sudah ter-populate).
