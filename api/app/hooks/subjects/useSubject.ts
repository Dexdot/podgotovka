import { SubjectI } from '@/types/subjects';
import { useState, useEffect, useCallback } from 'react';
import { getSubjectDetail } from '@/api/app/subjects';
import { showAlert } from '@/utils/network';

export function useSubject(subject_id: number): SubjectI | undefined {
  const [subject, setSubject] = useState<SubjectI>();

  const loadSubject = useCallback(async () => {
    if (!subject_id) return;

    try {
      const { data } = await getSubjectDetail(subject_id);
      setSubject(data);
    } catch (error) {
      showAlert({ error });
    }
  }, [subject_id]);

  useEffect(() => {
    loadSubject();
  }, [loadSubject]);

  return subject;
}
