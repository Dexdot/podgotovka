import { SubjectI } from '@/types/subjects';
import { useState, useEffect, useCallback } from 'react';
import { getSubjects } from '@/api/app/subjects';
import { showAlert } from '@/utils/network';

export function useSubjects(): SubjectI[] | undefined {
  const [subjects, setSubjects] = useState<SubjectI[]>();

  const loadSubjects = useCallback(async () => {
    try {
      const { data } = await getSubjects();
      setSubjects(data);
    } catch (error) {
      showAlert({ error });
    }
  }, []);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  return subjects;
}
