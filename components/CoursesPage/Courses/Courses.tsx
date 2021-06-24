import React from 'react';

import cls from './Course.module.scss';
import { Course } from './Course';
import { courses } from './helpers';

export const Courses: React.FC = () => {
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
