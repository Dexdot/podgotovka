import router from 'next/router';
import React from 'react';

import cls from './Subject.module.scss';
import { SubjectHeader } from './SubjectHeader/SubjectHeader';
import { SubjectList } from './SubjectList/SubjectList';

export const Subject: React.FC = () => {
  return (
    <div className={cls.subject}>
      <SubjectHeader
        title="Предметы"
        buttonText="Добавить"
        onClick={() => router.push('/app/subjects/create')}
        isDisable={false}
      />
      <SubjectList />
    </div>
  );
};
