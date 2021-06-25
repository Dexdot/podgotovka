import { useState, useEffect, useCallback } from 'react';

import { CourseI } from '@/types/courses';
import { CoursesAPI } from '@/api/courses';
import { showAlert } from '@/utils/network';

export function useCourses(): CourseI[] | undefined {
  const [courses, setCourses] = useState<CourseI[]>();

  const loadCourses = useCallback(async () => {
    try {
      const { data } = await CoursesAPI.getCourses();
      setCourses(data);
    } catch (error) {
      showAlert({ error });
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return courses;
}
