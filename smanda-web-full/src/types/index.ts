export type Role = 'siswa' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface ParentInfo {
  namaAyah: string;
  namaIbu: string;
  pekerjaan: string;
  gaji: number;
  pekerjaanAyah?: string;
  pekerjaanIbu?: string;
  gajiAyah?: number;
  gajiIbu?: number;
  status?: 'bersama' | 'bercerai' | 'wafat';
}

export interface StudentProfile {
  nisn: string;
  nama: string;
  email: string;
  kelas: string;
  orangTua: ParentInfo;
}

export interface Grade {
  mapel: string;
  nilai: number;
  status: GradeStatus;
}

export type GradeStatus = 'Menunggu' | 'Tervalidasi';

export type ServiceType = 'Konseling Individual' | 'Konseling Kelompok' | 'Bimbingan Karir' | 'Layanan Krisis';

export type KonsulStatus = 'Menunggu' | 'Disetujui' | 'Ditolak';

export interface Konsul {
  id: string;
  studentName: string;
  kelas: string;
  service: ServiceType;
  guruBK: string;
  catatan: string;
  status: KonsulStatus;
  tanggal: string;
}

export interface Geotag {
  lat: number;
  lng: number;
}

export type AbsensiStatus = 'Tepat Waktu' | 'Terlambat';

export interface Absensi {
  id: string;
  studentName: string;
  kelas: string;
  waktu: string;
  fotoWajah: string | null;
  lokasi: Geotag;
  status: AbsensiStatus;
}

export interface AdminGradeRow {
  name: string;
  kelas: string;
  mapel: string;
  nilai: number;
  status: GradeStatus;
}
