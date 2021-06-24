import router from 'next/router';
import React from 'react';
import cls from './SubjectList.module.scss';
import { SubjectListItem } from './SubjectListItem.tsx/SubjectListItem';

export const SubjectList: React.FC = () => {
  return (
    <div className={cls.subject_list}>
      <SubjectListItem
        title="Русский язык"
        subtitle="ЕГЭ"
        onClick={() => router.push('/app/subjects/1')}
      />
      <SubjectListItem
        title="Русский язык"
        subtitle="ЕГЭ"
        onClick={() => router.push('/app/subjects/1')}
      />
      <SubjectListItem
        title="Русский язык"
        subtitle="ЕГЭ"
        onClick={() => router.push('/app/subjects/1')}
      />
    </div>
  );
};
