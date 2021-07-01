import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { useDebounce } from '@/hooks/useDebounce';

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

  const [value, setValue] = useState<string>('');
  const search = useDebounce(value, 250);

  useEffect(() => {
    // todo search
  }, [search]);

  const handleSubmit = useCallback(() => {
    router.push({ pathname: `/library/search`, query: { search: value } });
  }, [router, value]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

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
    <section className={cls.root}>
      <Search
        value={value}
        onValueChange={setValue}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />

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
  );
};
