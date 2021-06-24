import React from 'react';
import { useRouter } from 'next/router';

import cls from './Subjects.module.scss';
import { SubjectHeader } from './SubjectHeader/SubjectHeader';
import { SubjectList } from './SubjectList/SubjectList';

export const SubjectsPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className={cls.subject}>
      <SubjectHeader
        title="Предметы"
        buttonText="Добавить предмет"
        onClick={() => router.push('/app/subjects/create')}
        disabled={false}
      />

      <SubjectList />
    </div>
  );
};
