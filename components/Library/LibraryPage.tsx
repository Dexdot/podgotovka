import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { SubjectI } from '@/types/subjects';

import { TODO_CATEGORIES } from './helpers';

import cls from './LibraryPage.module.scss';

interface PropsI {
  subjects: SubjectI[] | undefined;
}

export const LibraryPage: React.FC<PropsI> = ({ subjects }) => {
  const router = useRouter();
  const { subject_id } = router.query;

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

      <div className={cls.categories}>
        {TODO_CATEGORIES.map((category) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};
