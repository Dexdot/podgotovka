import React, { useCallback, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import cn from 'classnames';

import { ChevronRight, ListBullet } from '../Icons';
import { TODO_CATEGORIES } from '../helpers';

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
  const [isAutoOpened, toggleAutoOpened] = useState<boolean>(false);

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

  const autoOpenMaterail = useCallback(() => {
    const category = TODO_CATEGORIES.find(({ materials }) =>
      materials.find((item) => item.id === materialId)
    );
    if (category) {
      setOpened([category.id]);
      toggleAutoOpened(true);
    }
  }, [materialId]);

  useEffect(() => {
    if (materialId && !isAutoOpened) {
      autoOpenMaterail();
    }
  }, [materialId, isAutoOpened, autoOpenMaterail]);

  return (
    <div className={cls.detailed_wrapper}>
      {TODO_CATEGORIES.map(({ id, name, materials }) => {
        const isOpened = opened.includes(id);

        return (
          <ul key={id} className={cn({ [cls.category_active]: isOpened })}>
            <button type="button" onClick={() => toggleCategory(id)}>
              <ChevronRight />
              {name}
            </button>
            <Collapse isOpened={isOpened}>
              {materials.map((item) => (
                <li
                  className={cn({
                    [cls.material_active]: materialId === item.id
                  })}
                >
                  <ListBullet />
                  <Link href={`/library/${item.id}`}>{item.name}</Link>
                </li>
              ))}
            </Collapse>
          </ul>
        );
      })}
    </div>
  );
};

CategoriesDetailed.defaultProps = {
  editMode: false
};
