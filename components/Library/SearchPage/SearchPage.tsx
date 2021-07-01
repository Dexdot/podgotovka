import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { pluralize } from '@/utils/pluralize';
import { TODO_SEARCH_RESULTS } from '../helpers';

import cls from './SearchPage.module.scss';

export const SearchPage: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    // todo search
    console.log(search);
  }, [search]);

  return (
    <div className={cls.material_card_wrapper}>
      <p className={cls.material_card_search}>
        <span>Результаты по запросу &quot;{search}&quot;</span>
        <span>•</span>
        <span>
          {pluralize({
            words: ['результат', 'результата', 'результатов'],
            count: TODO_SEARCH_RESULTS.length
          })}
        </span>
      </p>

      <div className={cls.material_card}>
        {TODO_SEARCH_RESULTS.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <li>
                <Link
                  href={`/library/subject/${item.subject_id}/material/${item.id}`}
                >
                  <a
                    href={`/library/subject/${item.subject_id}/material/${item.id}`}
                  >
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
              {index !== TODO_SEARCH_RESULTS.length - 1 && (
                <div className={cls.material_card_link_border} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
