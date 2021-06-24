import React from 'react';
import { useRouter } from 'next/router';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

import cls from './CoursesPage.module.scss';
import { Courses } from './Courses/Courses';

export const CoursesPage: React.FC = () => {
  const router = useRouter();
  const subjectID = router.query.subject_id as string;

  return (
    <div className={cls.root}>
      <BackLink href="/app/subjects" text="Все предметы" />

      <header className={cls.header}>
        <h1 className={cls.title}>Русский язык</h1>
        <ButtonLink href={`/app/subjects/${subjectID}/courses/create`}>
          Добавить курс
        </ButtonLink>
      </header>

      <Courses />
    </div>
  );
};
