export type GradeLevel = '10' | '11' | '12';
export type Semester = '1' | '2';

export interface GradeRow {
  id: string;
  mapel: string;
  nilai: number;
  status: 'Menunggu' | 'Complete';
}

export type GradeBook = Record<`${GradeLevel}-${Semester}`, GradeRow[]>;

export const subjectByLevel: Record<GradeLevel, string[]> = {
  '10': [
    'Pendidikan Agama dan Budi Pekerti',
    'PPKn',
    'Bahasa Indonesia',
    'Matematika',
    'Bahasa Inggris',
    'Informatika',
    'Sejarah Indonesia',
    'Seni Budaya',
    'PJOK',
    'Prakarya',
    'Geografi',
    'Fisika',
    'Kimia',
    'Biologi',
    'Sosiologi',
    'Ekonomi',
  ],
  '11': ['Pendidikan Agama dan Budi Pekerti', 'PPKn', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Sejarah Indonesia', 'Ekonomi', 'Sosiologi', 'Geografi', 'Fisika', 'Kimia', 'Biologi', 'Informatika', 'PJOK'],
  '12': ['Pendidikan Agama dan Budi Pekerti', 'PPKn', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Sejarah Indonesia', 'Ekonomi', 'Sosiologi', 'Geografi', 'Fisika', 'Kimia', 'Biologi', 'Informatika', 'PJOK'],
};

const STORAGE_KEY = 'smanda.gradebook';

export function gradeBookKey(level: GradeLevel, semester: Semester) {
  return `${level}-${semester}` as const;
}

export function createRows(level: GradeLevel, semester: Semester): GradeRow[] {
  return subjectByLevel[level].map((mapel, index) => ({
    id: `${level}-${semester}-${index}`,
    mapel,
    nilai: 0,
    status: 'Menunggu',
  }));
}

export function createInitialGradeBook(): GradeBook {
  return {
    '10-1': createRows('10', '1'),
    '10-2': createRows('10', '2'),
    '11-1': createRows('11', '1'),
    '11-2': createRows('11', '2'),
    '12-1': createRows('12', '1'),
    '12-2': createRows('12', '2'),
  };
}

export function loadGradeBook(): GradeBook {
  if (typeof window === 'undefined') return createInitialGradeBook();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialGradeBook();

    const parsed = JSON.parse(raw) as GradeBook;
    return parsed && typeof parsed === 'object' ? parsed : createInitialGradeBook();
  } catch {
    return createInitialGradeBook();
  }
}

export function saveGradeBook(book: GradeBook) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
}
