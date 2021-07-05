import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { SearchMaterialsI } from '@/types/library';

import { LibraryAPI } from '@/api/app/library';

import { showAlert } from '@/utils/network';
import { declension } from '@/utils/format';

import { getDescription } from './helpers';

import cls from './SearchPage.module.scss';

export const SearchPage: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;

  const [searchResults, setSearchResults] = useState<SearchMaterialsI>({
    number_of_results: 0,
    materials: []
  });

  const fetch = useCallback(async () => {
    if (search) {
      try {
        const { data } = await LibraryAPI.fetchMaterials({
          q: search as string
        });
        setSearchResults(data);
      } catch (error) {
        showAlert({ error });
      }
    }
  }, [search]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className={cls.material_card_wrapper}>
      <p className={cls.material_card_search}>
        <span>Результаты по запросу &quot;{search}&quot;</span>
        <span>•</span>
        <span>
          {`${searchResults.number_of_results} ${declension(
            searchResults.number_of_results,
            'результат',
            'результата',
            'результатов'
          )}`}
        </span>
      </p>

      <div className={cls.material_card}>
        {searchResults.materials.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <li>
                <Link
                  href={`/library/subject/${item.subject.id}/material/${item.id}`}
                >
                  <a
                    href={`/library/subject/${item.subject.id}/material/${item.id}`}
                  >
                    <p className={cls.material_card_link_name}>{item.name}</p>
                    <p className={cls.material_card_link_desc}>
                      {getDescription(item.text, search as string)}
                    </p>
                    <p className={cls.material_card_link_subject}>
                      {item.subject.name}
                    </p>
                  </a>
                </Link>
              </li>
              {index !== searchResults.materials.length - 1 && (
                <div className={cls.material_card_link_border} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
