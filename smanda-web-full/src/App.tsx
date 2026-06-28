import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./hooks/ProtectedRoute";
import DashboardShell from "./layouts/DashboardShell";
import Login from "./features/auth/Login";

import DashboardSiswa from "./features/siswa/DashboardSiswa";
import ProfilSiswa from "./features/siswa/ProfilSiswa";
import InputNilai from "./features/siswa/InputNilai";
import InputKonsul from "./features/siswa/InputKonsul";
import Absen from "./features/siswa/Absen";

import DashboardAdmin from "./features/admin/DashboardAdmin";
import DataNilai from "./features/admin/DataNilai";
import CekAbsensi from "./features/admin/CekAbsensi";
import DataOrtu from "./features/admin/DataOrtu";
import CekKonsul from "./features/admin/CekKonsul";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Siswa */}
        <Route element={<ProtectedRoute allow="siswa" />}>
          <Route path="/siswa" element={<DashboardShell role="siswa" />}>
            <Route index element={<DashboardSiswa />} />
            <Route path="profil" element={<ProfilSiswa />} />
            <Route path="nilai" element={<InputNilai />} />
            <Route path="konsul" element={<InputKonsul />} />
            <Route path="absen" element={<Absen />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allow="admin" />}>
          <Route path="/admin" element={<DashboardShell role="admin" />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="nilai" element={<DataNilai />} />
            <Route path="absensi" element={<CekAbsensi />} />
            <Route path="ortu" element={<DataOrtu />} />
            <Route path="konsul" element={<CekKonsul />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
