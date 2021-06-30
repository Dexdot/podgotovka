import React from 'react';

import { SubjectI } from '@/types/subjects';

import Link from 'next/link';

import { TODO_CATEGORIES } from '../helpers';

import cls from './Categories.module.scss';

interface PropsI {
  subject: SubjectI | null;
}

export const Categories: React.FC<PropsI> = ({ subject }) => {
  return (
    <div className={cls.simple_wrapper}>
      <h2>{subject ? subject.name : 'Нет предметов'}</h2>

      <div className={cls.categories_simple}>
        {TODO_CATEGORIES.map((category) => (
          <div className={cls.category_simple} key={category.id}>
            <h3>{category.name}</h3>
            {category.materials.map((item) => (
              <Link key={item.id} href={`/library/${item.id}`}>
                {item.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
