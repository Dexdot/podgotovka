import React, { cloneElement } from 'react';
import { useRouter } from 'next/router';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { LibraryContext, libraryStore } from '@/store/library';

import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { Search } from '@/components/layouts/LibraryLayout/Search';

import cls from './LibraryLayout.module.scss';

interface PropsI {
  children?: React.ReactElement;
}

export const LibraryLayout: React.FC<PropsI> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { subject_id } = router.query;

  const subjects = useSubjects();

  const getButtonVariant = (
    subjectId: number
  ): 'grey' | 'primary' | 'secondary' => {
    if (pathname.includes('search')) {
      return 'grey';
    }
    if (Number(subject_id) === subjectId) {
      return 'primary';
    }
    return 'secondary';
  };

  return (
    <LibraryContext.Provider value={libraryStore}>
      <section className={cls.root}>
        <Search />

        <div className={cls.search_subjects}>
          {subjects?.map((item) => (
            <ButtonLink
              key={item.id}
              href={`/library/subject/${item.id}`}
              variant={getButtonVariant(item.id)}
            >
              {item.name}
            </ButtonLink>
          ))}
        </div>

        {children &&
          cloneElement(children, {
            subjects
          })}
      </section>
    </LibraryContext.Provider>
  );
};
