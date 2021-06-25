import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

// import { SubjectContext, subjectsStore } from '@/store/subjects';
import { observer } from 'mobx-react-lite';
import cls from './Subjects.module.scss';
import { SubjectHeader } from './SubjectHeader/SubjectHeader';
import { SubjectList } from './SubjectList/SubjectList';

export const SubjectsPage: React.FC = observer(() => {
  // const subjectStore = useContext(SubjectContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname === '/app/subjects') {
  //     subjectsStore.getSubjects();
  //   }
  // }, []);

  return (
    <div className={cls.subject}>
      <SubjectHeader
        title="Предметы"
        buttonText="Добавить предмет"
        onClick={() => router.push('/app/subjects/create')}
        disabled={false}
      />
      <SubjectList items={subjectStore.subjects} />
    </div>
  );
});
