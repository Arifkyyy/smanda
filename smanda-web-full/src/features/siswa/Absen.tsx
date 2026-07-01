import { useRef, useState, useCallback } from 'react';
import { Camera, MapPin, CheckCircle2, Crosshair } from 'lucide-react';
import { Card } from '../../components/ui';
import type { Geotag } from '../../types';

export default function Absen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cam, setCam] = useState(false);
  const [coords, setCoords] = useState<Geotag | null>(null);
  const [captured, setCaptured] = useState(false);

  const startCam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCam(true);
    } catch {
      setCam(false);
    }
  }, []);

  const getLoc = useCallback(() => {
    navigator.geolocation?.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setCoords({ lat: -6.8201, lng: 107.143 }), // fallback: SMAN 2 Cianjur
    );
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Absen Kehadiran</h1>
        <p className="text-slate-400 text-sm mt-1">Verifikasi wajah dan lokasi untuk mencatat kehadiran hari ini.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">
            <Camera size={18} className="text-purple-600" /> Foto Wajah
          </div>
          <div className="aspect-video rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center relative">
            <video ref={videoRef} autoPlay muted className={`h-full w-full object-cover ${cam ? '' : 'hidden'}`} />
            {!cam && (
              <div className="text-center text-slate-400 text-sm px-4">
                <Camera className="mx-auto mb-2 opacity-50" /> Kamera belum aktif
              </div>
            )}
            {cam && <div className="absolute inset-6 border-2 border-dashed border-white/40 rounded-full" />}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={startCam} className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200">
              Aktifkan Kamera
            </button>
            <button onClick={() => setCaptured(true)} disabled={!cam} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium disabled:opacity-40">
              Ambil Foto
            </button>
          </div>
          {captured && (
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle2 size={14} /> Wajah berhasil ditangkap
            </p>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">
            <MapPin size={18} className="text-purple-600" /> Geotagging Lokasi
          </div>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'linear-gradient(#a78bfa 1px,transparent 1px),linear-gradient(90deg,#a78bfa 1px,transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {coords ? (
              <div className="relative text-center">
                <Crosshair className="mx-auto text-purple-600 animate-pulse" size={28} />
                <p className="text-xs font-mono text-slate-600 mt-2">
                  {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                </p>
              </div>
            ) : (
              <p className="relative text-slate-400 text-sm">Koordinat belum diambil</p>
            )}
          </div>
          <button onClick={getLoc} className="w-full mt-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200">
            Ambil Koordinat GPS
          </button>
          {coords && (
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle2 size={14} /> Lokasi terekam
            </p>
          )}
        </Card>
      </div>
      <button
        disabled={!captured || !coords}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-600/25 disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 transition-all"
      >
        Kirim Absensi
      </button>
    </div>
  );
}
