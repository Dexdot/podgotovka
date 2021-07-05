import React, { useCallback, useContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { LibraryContext } from '@/store/library';

import { Input } from '@/components/common/Input/Input';
import { Spinner } from '@/components/common/Spinner/Spinner';

import { CheckIcon, CrossIcon } from '../../Icons';

import cls from '../Categories.module.scss';

interface PropsI {
  isOpen: boolean;
  toggle: (value: boolean) => void;
  onCreate: (categoryId: number) => void;
}

export const CreateCategory: React.FC<PropsI> = observer(
  ({ isOpen, toggle, onCreate }) => {
    const router = useRouter();
    const { subject_id } = router.query;

    const subjectId = useMemo<number>(() => Number(subject_id), [subject_id]);

    const { createCategory } = useContext(LibraryContext);

    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const addCategory = useCallback(() => {
      if (newCategoryName.trim()) {
        setLoading(true);
        createCategory({ subject_id: subjectId, name: newCategoryName })
          .then((res) => {
            onCreate(res.id);
            setNewCategoryName('');
            toggle(false);
          })
          .finally(() => setLoading(false));
      }
    }, [toggle, newCategoryName, subjectId, createCategory, onCreate]);

    const close = useCallback(() => {
      setNewCategoryName('');
      toggle(false);
    }, [toggle]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
          addCategory();
        }
      },
      [addCategory]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Escape') {
          close();
        }
      },
      [close]
    );

    return (
      <div
        className={cn(cls.create_category, {
          [cls.create_category_open]: isOpen
        })}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Input
              key={isOpen.toString()}
              placeholder="Название категории"
              value={newCategoryName}
              onChange={(event) =>
                setNewCategoryName(event.currentTarget.value)
              }
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
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
              <button type="button" onClick={close}>
                <CrossIcon />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
);
