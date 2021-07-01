import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import cn from 'classnames';

import { SubjectI } from '@/types/subjects';

import { useDebounce } from '@/hooks/useDebounce';

import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';

import { TODO_CATEGORIES } from '../helpers';
import {
  CheckIcon,
  ChevronRight,
  CrossIcon,
  ListBullet,
  PlusIcon
} from '../Icons';

import cls from './Categories.module.scss';

interface PropsI {
  subjects: SubjectI[] | undefined;
  subjectId: number;
  materialId: number | null;
  editMode?: boolean;
}

export const Categories: React.FC<PropsI> = ({
  editMode,
  materialId,
  subjects,
  subjectId
}) => {
  const [opened, setOpened] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 200);
  const [isAutoOpened, toggleAutoOpened] = useState<boolean>(false);
  const [subject, setSubject] = useState<DropdownItem | null>(null);
  const [creatingCategory, toggleCreatingCategory] = useState<boolean>(false);
  const [creatingMaterial, toggleCreatingMaterial] = useState<number | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newMaterialName, setNewMaterialName] = useState<string>('');

  const subjectsToOptions = useMemo<DropdownItem[]>(
    () =>
      subjects?.map(({ id, name }) => ({ id: id.toString(), text: name })) ||
      [],
    [subjects]
  );

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

  const addCategory = useCallback(() => {
    console.log(newCategoryName);
    setNewCategoryName('');
    toggleCreatingCategory(false);
  }, [newCategoryName]);

  const addMaterial = useCallback(
    (categoryId: number) => {
      console.log(categoryId, newMaterialName);
      setNewMaterialName('');
      toggleCreatingMaterial(null);
    },
    [newMaterialName]
  );

  useEffect(() => {
    // todo search
  }, [debouncedSearch]);

  useEffect(() => {
    if (materialId && !isAutoOpened) {
      autoOpenMaterail();
    }
  }, [materialId, isAutoOpened, autoOpenMaterail]);

  useEffect(() => {
    if (subjectId && !subject) {
      const currentSubject =
        subjectsToOptions.find((item) => Number(item.id) === subjectId) || null;
      setSubject(currentSubject);
    }
  }, [subjectId, subject, subjectsToOptions]);

  return (
    <div className={cn(cls.wrapper, { [cls.wrapper_edit]: editMode })}>
      {editMode && (
        <div className={cls.header}>
          <Dropdown
            items={subjectsToOptions}
            placeholder="Предмет"
            value={subject}
            onChange={setSubject}
          />
          <Input
            search
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
      )}
      <div className={cls.categories}>
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
                    key={item.id}
                    className={cn({
                      [cls.material_active]: materialId === item.id,
                      [cls.material_draft]: !item.isPublished
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
                      onClick={() => toggleCreatingMaterial(id)}
                    >
                      <PlusIcon />
                      <span>Добавить материал</span>
                    </button>
                    <div
                      className={cn(
                        cls.create_category,
                        cls.create_material_input,
                        {
                          [cls.create_category_open]: creatingMaterial === id
                        }
                      )}
                    >
                      <Input
                        placeholder="Название материала"
                        value={newMaterialName}
                        onChange={(event) =>
                          setNewMaterialName(event.currentTarget.value)
                        }
                        autoFocus
                      />
                      <div className={cls.new_btns}>
                        <button
                          type="button"
                          disabled={!newMaterialName}
                          onClick={() => addMaterial(id)}
                        >
                          <CheckIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            toggleCreatingMaterial(null);
                            setNewMaterialName('');
                          }}
                        >
                          <CrossIcon />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Collapse>
            </ul>
          );
        })}
        {!TODO_CATEGORIES.length && (
          <p className={cls.categories_empty}>
            У этого предмета пока нет категорий
          </p>
        )}
        <div
          className={cn(cls.create_category, {
            [cls.create_category_open]: creatingCategory
          })}
        >
          <Input
            placeholder="Название категории"
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.currentTarget.value)}
            autoFocus
          />
          <div className={cls.new_btns}>
            <button
              type="button"
              disabled={!newCategoryName}
              onClick={addCategory}
            >
              <CheckIcon />
            </button>
            <button
              type="button"
              onClick={() => {
                toggleCreatingCategory(false);
                setNewCategoryName('');
              }}
            >
              <CrossIcon />
            </button>
          </div>
        </div>
      </div>
      {editMode && (
        <div className={cls.footer}>
          <Button
            variant="secondary"
            disabled={creatingCategory}
            onClick={() => toggleCreatingCategory(true)}
          >
            Добавить категорию
          </Button>
        </div>
      )}
    </div>
  );
};

Categories.defaultProps = {
  editMode: false
};
