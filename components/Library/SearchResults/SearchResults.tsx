import React, { Fragment } from 'react';
import Link from 'next/link';

import { pluralize } from '@/utils/pluralize';
import { TODO_CATEGORIES } from '../helpers';
import { SearchResultsLink } from './SearchResultsLink';

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
                  <SearchResultsLink
                    material={item}
                    subject="какой-то предмет"
                    href={`/library/${item.id}`}
                  />
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
