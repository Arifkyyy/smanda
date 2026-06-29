import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { students as initialStudents, type StudentRow } from '../data/mock';

type StudentPatch = Partial<StudentRow> & {
  orangTua?: Partial<StudentRow['orangTua']>;
};

interface StudentsContextValue {
  students: StudentRow[];
  currentStudent: StudentRow;
  updateCurrentStudent: (patch: StudentPatch) => void;
}

const STORAGE_KEY = 'smanda.students';

const StudentsContext = createContext<StudentsContextValue | null>(null);

function loadStudents(): StudentRow[] {
  if (typeof window === 'undefined') return initialStudents;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialStudents;

    const parsed = JSON.parse(raw) as StudentRow[];
    return Array.isArray(parsed) && parsed.length ? parsed : initialStudents;
  } catch {
    return initialStudents;
  }
}

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<StudentRow[]>(loadStudents);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const updateCurrentStudent = (patch: StudentPatch) => {
    setStudents((current) =>
      current.map((student, index) => {
        if (index !== 0) return student;

        return {
          ...student,
          ...patch,
          orangTua: {
            ...student.orangTua,
            ...patch.orangTua,
          },
        };
      }),
    );
  };

  const value = useMemo(
    () => ({
      students,
      currentStudent: students[0],
      updateCurrentStudent,
    }),
    [students],
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents(): StudentsContextValue {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error('useStudents must be used within StudentsProvider');
  return ctx;
}
