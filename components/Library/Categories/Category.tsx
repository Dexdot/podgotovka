import React, { useMemo, useState } from 'react';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { CategoryI } from '@/types/library';

import { ChevronRight, ListBullet, PlusIcon } from '../Icons';
import { CreateMaterial } from './Create/CreateMaterial';

import cls from './Categories.module.scss';

interface PropsI {
  category: CategoryI;
  isOpened: boolean;
  toggleCategory: (newCategory: number) => void;
}

export const Category: React.FC<PropsI> = ({
  category,
  isOpened,
  toggleCategory
}) => {
  const router = useRouter();
  const { pathname } = router;
  const { subject_id, material_id } = router.query;

  const materialId = useMemo<number | null>(
    () => (material_id ? Number(material_id) : null),
    [material_id]
  );

  const subjectId = useMemo<number | null>(
    () => (subject_id ? Number(subject_id) : null),
    [subject_id]
  );

  const editMode = useMemo<boolean>(
    () => pathname.includes('create') || pathname.includes('edit'),
    [pathname]
  );

  const [creatingMaterial, toggleCreatingMaterial] = useState<boolean>(false);

  return (
    <ul key={category.id} className={cn({ [cls.category_active]: isOpened })}>
      <button type="button" onClick={() => toggleCategory(category.id)}>
        <ChevronRight />
        {category.name}
      </button>
      <Collapse isOpened={isOpened}>
        {category.materials.map((item) => (
          <li
            key={item.id}
            className={cn({
              [cls.material_active]: materialId === item.id,
              [cls.material_draft]: !item.is_published
            })}
          >
            {!editMode && <ListBullet />}
            <Link
              href={`/library/subject/${subjectId}/material/${item.id}${
                editMode ? '/edit' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
        {editMode && (
          <>
            <button
              className={cn(cls.create_material_btn, {
                [cls.create_material_btn_closed]: creatingMaterial
              })}
              type="button"
              disabled={!!creatingMaterial}
              onClick={() => toggleCreatingMaterial(true)}
            >
              <PlusIcon />
              <span>Добавить материал</span>
            </button>
            <CreateMaterial
              toggle={toggleCreatingMaterial}
              isOpen={creatingMaterial}
              categoryId={category.id}
            />
          </>
        )}
      </Collapse>
    </ul>
  );
};
