import React from 'react';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { useSubject } from '@/api/hooks/subjects/useSubject';

import cls from './CoursesPage.module.scss';
import { Courses } from './Courses/Courses';

type Props = {
  subjectID: number;
};

export const CoursesPage: React.FC<Props> = ({ subjectID }) => {
  const subject = useSubject(subjectID);

  return (
    <div className={cls.root}>
      <BackLink href="/app/subjects" text="Все предметы" />

      <header className={cls.header}>
        <h1 className={cls.title}>{subject?.name}</h1>
        <ButtonLink href={`/app/subjects/${subjectID}/courses/create`}>
          Добавить курс
        </ButtonLink>
      </header>

      <Courses />
    </div>
  );
};
