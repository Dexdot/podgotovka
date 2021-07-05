import { useState, useEffect, useCallback } from 'react';

import { CourseI } from '@/types/courses';
import { CoursesAPI, CoursesFilters } from '@/api/app/courses';
import { showAlert } from '@/utils/network';

export function useCourses(filters: CoursesFilters): CourseI[] | undefined {
  const [courses, setCourses] = useState<CourseI[]>();

  const loadCourses = useCallback(async () => {
    try {
      const { data } = await CoursesAPI.getCourses(filters);
      setCourses(data);
    } catch (error) {
      showAlert({ error });
    }
  }, [filters]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return courses;
}
