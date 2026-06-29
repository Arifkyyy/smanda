interface BrandProps {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

export default function Brand({ size = "md", light = false }: BrandProps) {
  const dim = size === "lg" ? "h-20 w-20" : size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const title = size === "lg" ? "text-2xl" : "text-base";

  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo-smanda.png"
        alt="Logo SMAN 2 Cianjur"
        className={`${dim} object-contain drop-shadow-sm`}
      />
      <div className="leading-tight">
        <p className={`${title} font-bold ${light ? "text-white" : "text-slate-800"}`}>
          SMAN 2 Cianjur
        </p>
        <p className={`text-xs ${light ? "text-purple-100" : "text-slate-400"}`}>
          Bimbingan Konseling
        </p>
      </div>
    </div>
  );
}
