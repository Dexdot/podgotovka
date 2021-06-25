import React from 'react';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { Button } from '@/components/common/Button/Button';
import { useSubject } from '@/api/hooks/subjects/useSubject';
import { useCourses } from '@/api/hooks/courses/useCourses';

import cls from './CoursesPage.module.scss';
import { Courses } from './Courses/Courses';

type Props = {
  subjectID: number;
};

export const CoursesPage: React.FC<Props> = ({ subjectID }) => {
  const subject = useSubject(subjectID);

  // TODO: Load courses by subject
  const courses = useCourses();

  return (
    <div className={cls.root}>
      <BackLink href="/app/subjects" text="Все предметы" />

      <header className={cls.header}>
        <h1 className={cls.title}>{subject?.name}</h1>
        <Button onClick={() => null}>Добавить курс</Button>
      </header>

      {courses && <Courses courses={courses} />}
    </div>
  );
};
