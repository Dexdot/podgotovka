import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { SubjectI } from '@/types/subjects';

import { Categories } from '../Categories/Categories';
import { Material } from '../Material/Material';

import cls from './ViewMaterialPage.module.scss';

interface PropsI {
  subjects: SubjectI[] | undefined;
}

export const ViewMaterialPage: React.FC<PropsI> = ({ subjects }) => {
  const router = useRouter();
  const { subject_id, material_id } = router.query;

  const subject = useMemo<SubjectI | null>(
    () => subjects?.find((item) => item.id === Number(subject_id)) || null,
    [subject_id, subjects]
  );

  return (
    <div className={cls.wrapper}>
      {material_id && (
        <>
          <div className={cls.categories}>
            <h2>{subject?.name}</h2>
            <Categories subjects={subjects} />
          </div>
          <div className={cls.material}>
            <Material />
          </div>
        </>
      )}
    </div>
  );
};
