import React from 'react';

import { CourseI } from '@/types/courses';

import cls from './Course.module.scss';
import { Course } from './Course';

type Props = {
  courses: CourseI[];
};

export const Courses: React.FC<Props> = ({ courses }) => {
  return (
    <ul className={cls.courses}>
      {courses.map((c) => (
        <li key={c.id}>
          <Course course={c} />
        </li>
      ))}
    </ul>
  );
};
