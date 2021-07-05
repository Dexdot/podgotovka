/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { SubjectI } from '@/types/subjects';

import { LibraryContext } from '@/store/library';

import { useDebounce } from '@/hooks/useDebounce';
import { useRefState } from '@/hooks/useRefState';

import { reorderDND } from '@/utils/common';

import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Spinner } from '@/components/common/Spinner/Spinner';

import { Category } from './Category';
import { CreateCategory } from './Create/CreateCategory';

import cls from './Categories.module.scss';

interface PropsI {
  subjects: SubjectI[] | undefined;
}

export const Categories: React.FC<PropsI> = observer(({ subjects }) => {
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

  const {
    categories,
    loading,
    fetchCategories,
    reorderMaterials,
    reorderMaterialsBetweenCategories
  } = useContext(LibraryContext);

  const [opened, setOpened] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 200);
  const [isAutoOpened, toggleAutoOpened] = useState<boolean>(false);
  const [subject, setSubject] = useState<DropdownType | null>(null);
  const [creatingCategory, toggleCreatingCategory] = useState<boolean>(false);
  const [dragInProgress, toggleDragInProgress] = useRefState<boolean>(false);

  const subjectsToOptions = useMemo<DropdownType[]>(
    () =>
      subjects?.map(({ id, name }) => ({ id: id.toString(), text: name })) ||
      [],
    [subjects]
  );

  const openCategory = useCallback(
    (categoryId) => {
      if (!opened.includes(categoryId)) {
        setOpened([...opened, categoryId]);
      }
    },
    [opened]
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
    const category = categories.find(({ materials }) =>
      materials.find((item) => item.id === materialId)
    );
    if (category) {
      setOpened([category.id]);
      toggleAutoOpened(true);
    }
  }, [materialId, categories]);

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

  useEffect(() => {
    if (subjectId) {
      fetchCategories({ subject_id: subjectId, q: debouncedSearch });
    }
  }, [subjectId, debouncedSearch, fetchCategories]);

  useEffect(() => {
    if (
      subject &&
      subject.id &&
      subjectId &&
      Number(subject.id) !== subjectId
    ) {
      router.push(`/library/subject/${subject.id}/create`);
    }
  }, [subject, subjectId, router]);

  const handleDrag = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (destination) {
      const newCategoryId = Number(destination.droppableId.replace(/\D/g, ''));
      const draggedMaterialId = Number(draggableId.replace(/\D/g, ''));

      const changedCategory = categories.find(
        (item) => item.id === newCategoryId
      )!;

      const reordered = reorderDND(
        changedCategory.materials,
        source.index,
        destination.index
      );

      const isSameCategory = destination.droppableId === source.droppableId;

      if (isSameCategory) {
        reorderMaterials({
          orderedMaterials: reordered,
          category_id: newCategoryId
        });
      } else {
        reorderMaterialsBetweenCategories({
          material_id: draggedMaterialId,
          category_id: newCategoryId,
          position: destination.index
        });
      }
    }
    toggleDragInProgress(false);
  };

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
      <DragDropContext
        onDragStart={() => toggleDragInProgress(true)}
        onDragEnd={handleDrag}
      >
        <div className={cls.categories}>
          {loading !== 'loading' &&
            categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                isOpened={opened.includes(category.id)}
                toggleCategory={toggleCategory}
                openCategory={openCategory}
                dragInProgress={dragInProgress}
              />
            ))}
          {!categories.length && loading !== 'loading' && (
            <p className={cls.categories_empty}>
              {debouncedSearch
                ? 'Ничего не найдено'
                : 'У этого предмета пока нет категорий'}
            </p>
          )}
          {loading === 'loading' && (
            <div className={cls.spinner}>
              <Spinner />
            </div>
          )}
        </div>
      </DragDropContext>
      <CreateCategory
        isOpen={creatingCategory}
        toggle={toggleCreatingCategory}
        onCreate={toggleCategory}
      />
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
});
