import React, { useMemo } from 'react';
import { useCourses } from '@/api/hooks/courses/useCourses';
import { Courses } from './Courses';

type Props = {
  subjectID: number;
};

export const CoursesWrap: React.FC<Props> = ({ subjectID }) => {
  const filters = useMemo(
    () => ({
      subject_id: subjectID
    }),
    [subjectID]
  );

  const courses = useCourses(filters);

  return courses ? <Courses courses={courses} /> : null;
};
