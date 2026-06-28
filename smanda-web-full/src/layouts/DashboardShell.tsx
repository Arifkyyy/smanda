import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, User, ClipboardList, CalendarHeart, Camera,
  Users, FileCheck2, MapPin, LogOut, Menu, X, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "../types";
import { useAuth } from "../hooks/useAuth";
import Brand from "../components/Brand";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const siswaNav: NavItem[] = [
  { to: "/siswa", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/siswa/profil", label: "Profil Siswa", icon: User },
  { to: "/siswa/nilai", label: "Input Nilai", icon: ClipboardList },
  { to: "/siswa/konsul", label: "Input Konsul", icon: CalendarHeart },
  { to: "/siswa/absen", label: "Absen", icon: Camera },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/nilai", label: "Data Nilai Siswa", icon: ClipboardList },
  { to: "/admin/absensi", label: "Cek Absensi", icon: MapPin },
  { to: "/admin/ortu", label: "Data Ortu Siswa", icon: Users },
  { to: "/admin/konsul", label: "Cek Konsul", icon: FileCheck2 },
];

export default function DashboardShell({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = role === "siswa" ? siswaNav : adminNav;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
    : "";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-violet-800 via-purple-800 to-indigo-800 border-r border-violet-700/40 flex flex-col transition-transform ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-5 py-5 border-b border-violet-700/50 flex items-center justify-between">
          <Brand size="sm" light />
          <button onClick={() => setOpen(false)} className="lg:hidden text-violet-100/80" aria-label="Tutup menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/20 text-white shadow-md shadow-violet-950/30"
                      : "text-violet-100/90 hover:bg-white/10"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} /> {item.label}
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-violet-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-100 hover:bg-white/10 transition"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 bg-slate-900/20 z-30 lg:hidden" />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100 px-5 py-3.5 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="lg:hidden text-slate-500" aria-label="Buka menu">
            <Menu size={22} />
          </button>
          <div className="flex-1">
            <p className="text-sm text-slate-400">Selamat datang kembali,</p>
            <p className="font-semibold text-slate-800 -mt-0.5">{user?.name}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
        </header>

        <main className="p-5 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
