import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { Button } from '@/components/common/Button/Button';

import { CoursesAPI } from '@/api/courses';
import { useSubject } from '@/api/hooks/subjects/useSubject';
import { showAlert } from '@/utils/network';

import cls from './CoursesPage.module.scss';
import { CoursesWrap } from './Courses/CoursesWrap';

type Props = {
  subjectID: number;
};

export const CoursesPage: React.FC<Props> = ({ subjectID }) => {
  const router = useRouter();
  const subject = useSubject(subjectID);

  const [isLoading, setLoading] = useState(false);
  const create = async () => {
    setLoading(true);

    try {
      const { data } = await CoursesAPI.createCourse(subjectID);
      router.push(`/app/courses/${data.id}`);
    } catch (error) {
      showAlert({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.root}>
      <BackLink href="/app/subjects" text="Все предметы" />
      <header className={cls.header}>
        <h1 className={cls.title}>{subject?.name}</h1>
        <Button disabled={isLoading} loading={isLoading} onClick={create}>
          Добавить курс
        </Button>
      </header>

      <CoursesWrap subjectID={subjectID} />
    </div>
  );
};
