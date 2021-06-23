import React from 'react';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

import cls from './CoursesPage.module.scss';
import { Courses } from './Courses/Courses';

export const CoursesPage: React.FC = () => {
  return (
    <div className={cls.root}>
      <BackLink href="/app/subjects" text="Все предметы" />

      <header className={cls.header}>
        <h1 className={cls.title}>Русский язык</h1>
        <ButtonLink href="/courses/new">Добавить курс</ButtonLink>
      </header>

      <Courses />
    </div>
  );
};
