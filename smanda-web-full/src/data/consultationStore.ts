import { consultations as initialConsultations, type ConsultRow } from './mock';

const STORAGE_KEY = 'smanda.consultations';

export function loadConsultations(): ConsultRow[] {
  if (typeof window === 'undefined') return initialConsultations;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialConsultations;

    const parsed = JSON.parse(raw) as ConsultRow[];
    return Array.isArray(parsed) && parsed.length ? parsed : initialConsultations;
  } catch {
    return initialConsultations;
  }
}

export function saveConsultations(rows: ConsultRow[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export function getConsultStatusLabel(status: ConsultRow['status']) {
  if (status === 'Menunggu') return 'Pending';
  return status;
}

export function getConsultStatusCounts(rows: ConsultRow[]) {
  return {
    pending: rows.filter((row) => row.status === 'Menunggu').length,
    approved: rows.filter((row) => row.status === 'Disetujui').length,
    rejected: rows.filter((row) => row.status === 'Ditolak').length,
    history: rows.length,
  };
}
