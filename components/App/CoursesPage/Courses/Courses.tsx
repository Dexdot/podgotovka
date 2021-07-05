import React, { useState } from 'react';

import { CourseI } from '@/types/app/courses';

import cls from './Course.module.scss';
import { Course } from './Course';

type Props = {
  courses: CourseI[];
};

export const Courses: React.FC<Props> = ({ courses }) => {
  const [openedCourse, setOpenedCourse] = useState<number>(-1);
  const toggleOpen = (id: number): void => {
    setOpenedCourse(openedCourse === id ? -1 : id);
  };

  return (
    <ul className={cls.courses}>
      {courses.map((c) => (
        <li key={c.id}>
          <Course
            course={c}
            isOpen={openedCourse === c.id}
            onOpenClick={() => toggleOpen(c.id)}
          />
        </li>
      ))}
    </ul>
  );
};
