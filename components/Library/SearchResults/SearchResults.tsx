import React, { Fragment } from 'react';
import Link from 'next/link';

import { SubjectI } from '@/types/subjects';

import { pluralize } from '@/utils/pluralize';
import { TODO_MATERIALS } from '../helpers';
import { SearchResultsLink } from './SearchResultsLink';

import cls from './SearchResults.module.scss';

interface PropsI {
  search: string;
  subjects: SubjectI[] | undefined;
}

export const SearchResults: React.FC<PropsI> = ({ search, subjects }) => {
  return (
    <div className={cls.material_card_wrapper}>
      <p className={cls.material_card_search}>
        <span>Результаты по запросу &quot;{search}&quot;</span>
        <span>•</span>
        <span>
          {pluralize({
            words: ['результат', 'результата', 'результатов'],
            count: TODO_MATERIALS.length
          })}
        </span>
      </p>

      <div className={cls.material_card}>
        {TODO_MATERIALS.map((item, index) => {
          const subject =
            subjects?.find((subj) => subj.id === item.subject_id) || null;
          return (
            <Fragment key={item.id}>
              <li>
                <Link href={`/library/${item.id}`}>
                  <SearchResultsLink
                    material={item}
                    subject={subject}
                    href={`/library/${item.id}`}
                  />
                </Link>
              </li>
              {index !== TODO_MATERIALS.length - 1 && (
                <div className={cls.material_card_link_border} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
