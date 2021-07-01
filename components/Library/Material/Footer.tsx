import React from 'react';
import Link from 'next/link';

import { MaterialI } from '../helpers';

import { NextIcon } from '../Icons';

import cls from './Material.module.scss';

interface PropsI {
  nextMaterial: MaterialI;
  subjectId: number;
}

export const Footer: React.FC<PropsI> = ({ nextMaterial, subjectId }) => {
  return (
    <Link href={`/library/subject/${subjectId}/material/${nextMaterial.id}`}>
      <a
        className={cls.footer}
        href={`/library/subject/${subjectId}/material/${nextMaterial.id}`}
      >
        <div className={cls.footer_left}>
          <p>Следующая статья</p>
          <h3>{nextMaterial.name}</h3>
        </div>
        <NextIcon />
      </a>
    </Link>
  );
};
