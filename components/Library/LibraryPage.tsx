import React, { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { SubjectI } from '@/types/subjects';

import { LibraryContext } from '@/store/library';

import { Spinner } from '@/components/common/Spinner/Spinner';

import cls from './LibraryPage.module.scss';

interface PropsI {
  subjects: SubjectI[] | undefined;
}

export const LibraryPage: React.FC<PropsI> = observer(({ subjects }) => {
  const router = useRouter();
  const { subject_id } = router.query;

  const { categories, loading } = useContext(LibraryContext);

  const subject = useMemo<SubjectI | null>(
    () => subjects?.find((item) => item.id === Number(subject_id)) || null,
    [subject_id, subjects]
  );

  useEffect(() => {
    if (subjects && !subject_id) {
      router.push(`/library/subject/${subjects[0].id}`);
    }
  }, [subjects, subject_id, router]);

  return (
    <div className={cls.wrapper}>
      <h2>{subject ? subject.name : 'Нет предметов'}</h2>

      {loading !== 'loading' && (
        <div className={cls.categories}>
          {categories.map((category) => (
            <div className={cls.category} key={category.id}>
              <h3>{category.name}</h3>
              {category.materials.map((item) => (
                <Link
                  key={item.id}
                  href={`/library/subject/${subject_id}/material/${item.id}`}
                >
                  {item.name}
                </Link>
              ))}
              {category.materials.length === 0 && (
                <p className={cls.empty}>
                  В этой категории пока нет материалов
                </p>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <p className={cls.empty}>В этом предмете пока нет категорий</p>
          )}
        </div>
      )}
      {loading === 'loading' && <Spinner size={96} />}
    </div>
  );
});
