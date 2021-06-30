import React, { useCallback, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import cn from 'classnames';

import { ChevronRight, ListBullet } from '../Icons';
import { TODO_CATEGORIES, TODO_MATERIALS } from '../helpers';

import cls from './Categories.module.scss';

interface PropsI {
  materialId: number;
  editMode?: boolean;
}

export const CategoriesDetailed: React.FC<PropsI> = ({
  editMode,
  materialId
}) => {
  const [opened, setOpened] = useState<number[]>([]);

  const toggleCategory = useCallback(
    (categoryId) => {
      if (opened.includes(categoryId)) {
        setOpened(opened.filter((item) => item !== categoryId));
      } else {
        setOpened([...opened, categoryId]);
      }
    },
    [opened]
  );

  useEffect(() => {
    console.log(123);
  }, []);

  return (
    <div className={cls.detailed_wrapper}>
      {TODO_CATEGORIES.map(({ id, name }) => {
        const isOpened = opened.includes(id);

        return (
          <ul key={id} className={cn({ [cls.category_active]: isOpened })}>
            <button type="button" onClick={() => toggleCategory(id)}>
              <ChevronRight />
              {name}
            </button>
            {TODO_MATERIALS.map((item) => (
              <Collapse isOpened={isOpened}>
                <li
                  className={cn({
                    [cls.material_active]: materialId === item.id
                  })}
                >
                  <ListBullet />
                  <Link href={`/library/${item.id}`}>{item.name}</Link>
                </li>
              </Collapse>
            ))}
          </ul>
        );
      })}
    </div>
  );
};

CategoriesDetailed.defaultProps = {
  editMode: false
};
