import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../types";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ allow }: { allow: Role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allow) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/siswa"} replace />;
  }
  return <Outlet />;
}
