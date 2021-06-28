import React from 'react';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { Button } from '@/components/common/Button/Button';
import { useSubject } from '@/api/hooks/subjects/useSubject';

import cls from './CoursesPage.module.scss';
import { CoursesWrap } from './Courses/CoursesWrap';

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
        <Button onClick={() => null}>Добавить курс</Button>
      </header>

      <CoursesWrap subjectID={subjectID} />
    </div>
  );
};
