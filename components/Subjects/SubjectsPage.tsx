import router from 'next/router';
import React, { useContext } from 'react';

import { SubjectContext } from '@/store/subjects';
import cls from './Subjects.module.scss';
import { SubjectHeader } from './SubjectHeader/SubjectHeader';
import { SubjectList } from './SubjectList/SubjectList';

export const SubjectsPage: React.FC = () => {
  const subjectStore = useContext(SubjectContext);
  const elems = subjectStore.subjects;

  return (
    <div className={cls.subject}>
      <SubjectHeader
        title="Предметы"
        buttonText="Добавить"
        onClick={() => router.push('/app/subjects/create')}
        isDisable={false}
      />
      <SubjectList items={elems} />
    </div>
  );
};
