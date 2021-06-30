import React from 'react';
import { useRouter } from 'next/router';

import { LibraryLayoutPropsI } from '@/components/layouts/LibraryLayout/helpers';

import { CategoriesDetailed } from '../Categories/CategoriesDetailed';
import { Material } from '../Material/Material';

import cls from './MaterialPage.module.scss';

export const MaterialPage: React.FC<LibraryLayoutPropsI> = ({ subject }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={cls.wrapper}>
      {id && (
        <>
          <div className={cls.categories}>
            <h2>{subject?.name}</h2>
            <CategoriesDetailed materialId={Number(id)} />
          </div>
          <div className={cls.material}>
            <Material materialId={Number(id)} />
          </div>
        </>
      )}
    </div>
  );
};
