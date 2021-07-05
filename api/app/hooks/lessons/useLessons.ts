import { useState, useEffect, useCallback } from 'react';

import { LessonI } from '@/types/lessons';
import { LessonsAPI, LessonsFilters } from '@/api/app/lessons';
import { showAlert } from '@/utils/network';

export function useCourseLessons(
  courseID: number,
  filters: LessonsFilters
): LessonI[] | undefined {
  const [lessons, setLessons] = useState<LessonI[]>();

  const loadLessons = useCallback(async () => {
    try {
      const { data } = await LessonsAPI.getCourseLessons(courseID, filters);
      setLessons(data);
    } catch (error) {
      showAlert({ error });
    }
  }, [courseID, filters]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  return lessons;
}
