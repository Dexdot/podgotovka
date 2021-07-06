/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { CategoryI } from '@/types/library';

import { useRefState } from '@/hooks/useRefState';

import { ChevronRight, ListBullet, PlusIcon } from '../Icons';
import { CreateMaterial } from './Create/CreateMaterial';

import cls from './Categories.module.scss';

interface PropsI {
  category: CategoryI;
  isOpened: boolean;
  toggleCategory: (newCategory: number) => void;
  openCategory: (newCategory: number) => void;
  dragInProgress: boolean;
}

export const Category: React.FC<PropsI> = ({
  category,
  isOpened,
  toggleCategory,
  openCategory,
  dragInProgress
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
  const [, setCategoryHovered, stateRef] = useRefState<boolean>(false);
  const [categoryListHovered, setCategoryListHovered] =
    useRefState<boolean>(false);

  const handleMouseOver = () => {
    setCategoryHovered(true);
    setTimeout(() => {
      if (dragInProgress && stateRef.current) {
        openCategory(category.id);
      }
    }, 1000);
  };

  return (
    <Droppable
      droppableId={`droppable-category-${category.id}`}
      direction="vertical"
      isDropDisabled={!editMode}
    >
      {(providedCategory) => (
        <ul
          ref={providedCategory.innerRef}
          key={category.id}
          className={cn({
            [cls.category_active]: isOpened,
            [cls.category_drop_target]: categoryListHovered && dragInProgress
          })}
          onMouseEnter={() => {
            setCategoryListHovered(true);
          }}
          onMouseLeave={() => {
            setCategoryListHovered(false);
          }}
        >
          <button
            type="button"
            onClick={() => toggleCategory(category.id)}
            onMouseEnter={handleMouseOver}
            onMouseLeave={() => setCategoryHovered(false)}
          >
            <ChevronRight />
            {category.name}
          </button>
          <Collapse isOpened={isOpened}>
            {category.materials.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={`draggable-material-${item.id}`}
                index={index}
                isDragDisabled={!editMode}
              >
                {(
                  { innerRef, draggableProps, dragHandleProps },
                  { isDragging }
                ) => (
                  <li
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    className={cn({
                      [cls.material_active]: materialId === item.id,
                      [cls.material_draft]: !item.is_published,
                      [cls.material_dragging]: isDragging
                    })}
                  >
                    {!editMode && <ListBullet />}
                    <Link
                      href={
                        editMode
                          ? `/app/library/subject/${subjectId}/material/${item.id}/edit`
                          : `/library/subject/${subjectId}/material/${item.id}`
                      }
                    >
                      {item.name}
                    </Link>
                  </li>
                )}
              </Draggable>
            ))}
            {providedCategory.placeholder}
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
      )}
    </Droppable>
  );
};
