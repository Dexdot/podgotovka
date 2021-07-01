import React, { Fragment } from 'react';
import Link from 'next/link';

import { pluralize } from '@/utils/pluralize';
import { TODO_CATEGORIES } from '../helpers';

import cls from './SearchResults.module.scss';

interface PropsI {
  search: string;
}

export const SearchResults: React.FC<PropsI> = ({ search }) => {
  return (
    <div className={cls.material_card_wrapper}>
      <p className={cls.material_card_search}>
        <span>Результаты по запросу &quot;{search}&quot;</span>
        <span>•</span>
        <span>
          {pluralize({
            words: ['результат', 'результата', 'результатов'],
            count: TODO_CATEGORIES[0].materials.length
          })}
        </span>
      </p>

      <div className={cls.material_card}>
        {TODO_CATEGORIES[0].materials.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <li>
                <Link href={`/library/${item.id}`}>
                  <a href={`/library/${item.id}`}>
                    <p className={cls.material_card_link_name}>{item.name}</p>
                    <p className={cls.material_card_link_desc}>
                      {item.description}
                    </p>
                    <p className={cls.material_card_link_subject}>
                      todo subject
                    </p>
                  </a>
                </Link>
              </li>
              {index !== TODO_CATEGORIES[0].materials.length - 1 && (
                <div className={cls.material_card_link_border} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
