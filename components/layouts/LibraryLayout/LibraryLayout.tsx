import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { SubjectI } from '@/types/subjects';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { useDebounce } from '@/hooks/useDebounce';

import { Button } from '@/components/common/Button/Button';
import { Search } from '@/components/layouts/LibraryLayout/Search/Search';

import cls from './LibraryLayout.module.scss';

type Props = {
  children?: React.ReactElement;
};

export const LibraryLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;

  const subjects = useSubjects();

  const [value, setValue] = useState<string>('');
  const search = useDebounce(value, 250);
  const [subject, setSubject] = useState<SubjectI | null>(null);
  const [isSubmitted, toggleSubmitted] = useState<boolean>(false);

  useEffect(() => {
    // todo search
  }, [search, subject]);

  const handleSubmit = useCallback(() => {
    // todo search with descriptions
    if (id) {
      router.push(`/library`);
    }
    toggleSubmitted(true);
  }, [id, router]);

  const handleClear = useCallback(() => {
    setValue('');
    toggleSubmitted(false);
  }, []);

  const handleSubjectChange = useCallback(
    (item: SubjectI) => {
      setSubject(item);
      setValue('');
      toggleSubmitted(false);

      if (id) {
        router.push('/library');
      }
    },
    [id, router]
  );

  useEffect(() => {
    if (subjects?.length) {
      setSubject(subjects[0]);
    }
  }, [subjects]);

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
          <Button
            key={item.id}
            onClick={() => handleSubjectChange(item)}
            variant={isSubmitted ? 'grey' : 'primary'}
          >
            {item.name}
          </Button>
        ))}
      </div>
      {children &&
        cloneElement(children, {
          search: value,
          subject,
          isSubmitted,
          subjects
        })}
    </section>
  );
};
