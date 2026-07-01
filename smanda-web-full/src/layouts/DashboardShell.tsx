import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, ClipboardList, CalendarHeart, Users, FileCheck2, LogOut, Menu, X, ChevronRight, ChevronLeft, type LucideIcon } from 'lucide-react';
import type { Role } from '../types';
import { useAuth } from '../hooks/useAuth';
import Brand from '../components/Brand';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const siswaNav: NavItem[] = [
  { to: '/siswa', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/siswa/profil', label: 'Profil Siswa', icon: User },
  { to: '/siswa/nilai', label: 'Input Nilai', icon: ClipboardList },
  { to: '/siswa/konsul', label: 'Input Konsul', icon: CalendarHeart },
];

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/nilai', label: 'Data Nilai Siswa', icon: ClipboardList },
  { to: '/admin/ortu', label: 'Data Ortu Siswa', icon: Users },
  { to: '/admin/konsul', label: 'Cek Konsul', icon: FileCheck2 },
];

export default function DashboardShell({ role }: { role: Role }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = role === 'siswa' ? siswaNav : adminNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : '';

  const renderNav = (isCompact: boolean, closeMobileDrawer?: () => void) => (
    <>
      <nav className={`flex-1 ${isCompact ? 'p-2' : 'p-3'} space-y-1`}>
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  closeMobileDrawer?.();
                }
              }}
              className={({ isActive }) =>
                `${isCompact ? 'mx-auto w-12 h-12 rounded-2xl justify-center' : 'w-full px-4 py-2.5 rounded-xl justify-start'} flex items-center text-sm font-medium transition-all ${isActive ? 'bg-fuchsia-500 text-white shadow-lg shadow-purple-950/25' : 'text-violet-100/80 hover:bg-white/10 hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} />
                  <span className={isCompact ? 'sr-only' : 'ml-3'}>{item.label}</span>
                  {!isCompact && isActive && <ChevronRight size={16} className="ml-auto" />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className={`border-t border-white/10 ${isCompact ? 'p-2' : 'p-3'}`}>
        {!isCompact && (
          <button
            onClick={() => setDesktopOpen((value) => !value)}
            className="mx-auto mb-3 h-10 w-10 rounded-full bg-violet-700/80 text-white shadow-lg flex items-center justify-center border border-white/10 hover:bg-violet-600 transition"
            aria-label={desktopOpen ? 'Sembunyikan sidebar' : 'Buka sidebar'}
          >
            {desktopOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
        <button
          onClick={handleLogout}
          className={`${isCompact ? 'mx-auto w-12 h-12 rounded-2xl justify-center' : 'w-full px-4 py-2.5 rounded-xl justify-start'} flex items-center text-sm font-medium text-violet-100/80 hover:bg-white/10 hover:text-white transition`}
          aria-label="Keluar"
        >
          <LogOut size={18} />
          <span className={isCompact ? 'sr-only' : 'ml-3'}>Keluar</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-violet-700 via-purple-800 to-slate-950 border-r border-violet-100/10 shadow-2xl flex-col overflow-hidden transition-[width] duration-300 ${desktopOpen ? 'w-72' : 'w-20'}`}
      >
        <div className={`px-5 py-5 border-b border-white/10 flex items-center ${desktopOpen ? 'justify-between' : 'justify-center'}`}>
          <div className={desktopOpen ? 'block' : 'hidden'}>
            <Brand size="sm" light />
          </div>
          <div className={desktopOpen ? 'hidden' : 'block'}>
            <img src="/logo-smanda.png" alt="Logo SMAN 2 Cianjur" className="h-10 w-10 object-contain" />
          </div>
        </div>
        {renderNav(!desktopOpen)}
      </aside>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[84vw] max-w-[18rem] bg-gradient-to-b from-violet-700 via-purple-800 to-slate-950 border-r border-violet-100/10 shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <Brand size="sm" light />
          <button onClick={() => setMobileOpen(false)} className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/15 transition" aria-label="Tutup menu">
            <X size={20} />
          </button>
        </div>
        {renderNav(false, () => setMobileOpen(false))}
      </div>

      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden" />}

      <button
        onClick={() => setMobileOpen((value) => !value)}
        className="fixed left-4 top-4 z-50 h-12 w-12 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition lg:hidden"
        aria-label={mobileOpen ? 'Tutup sidebar' : 'Buka sidebar'}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`flex-1 flex flex-col min-w-0 transition-[padding] duration-300 lg:${desktopOpen ? 'pl-72' : 'pl-20'}`}>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100 px-5 py-3.5 flex items-center gap-3">
          <div className="hidden lg:block w-10" />
          <div className="flex-1">
            <p className="text-sm text-slate-400">Selamat datang kembali,</p>
            <p className="font-semibold text-slate-800 -mt-0.5">{user?.name}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-semibold">{initials}</div>
        </header>

        <main className="p-5 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
