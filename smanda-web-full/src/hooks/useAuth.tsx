import { createContext, useContext, useState, type ReactNode } from "react";
import type { Role, User } from "../types";

interface AuthContextValue {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USERS: Record<Role, User> = {
  siswa: { id: "s1", name: "Andi Pratama", email: "andi.p@smanda.sch.id", role: "siswa" },
  admin: { id: "ad1", name: "Admin Sekolah", email: "admin@smanda.sch.id", role: "admin" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role) => setUser(DEMO_USERS[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
