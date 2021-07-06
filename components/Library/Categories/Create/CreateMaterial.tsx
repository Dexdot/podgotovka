import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { LibraryContext } from '@/store/library';

import { Input } from '@/components/common/Input/Input';
import { Spinner } from '@/components/common/Spinner/Spinner';

import { CheckIcon, CrossIcon } from '../../Icons';

import cls from '../Categories.module.scss';

interface PropsI {
  categoryId: number;
  isOpen: boolean;
  toggle: (newValue: boolean) => void;
}

export const CreateMaterial: React.FC<PropsI> = observer(
  ({ categoryId, isOpen, toggle }) => {
    const router = useRouter();
    const { subject_id } = router.query;

    const { createMaterial } = useContext(LibraryContext);

    const [newMaterialName, setNewMaterialName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const addMaterial = useCallback(() => {
      if (newMaterialName.trim()) {
        setLoading(true);
        createMaterial({
          name: newMaterialName,
          category_id: categoryId
        })
          .then((res) => {
            setNewMaterialName('');
            toggle(false);
            router.push(
              `/app/library/subject/${subject_id}/material/${res.id}/edit`
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [
      toggle,
      createMaterial,
      newMaterialName,
      categoryId,
      subject_id,
      router
    ]);

    const close = useCallback(() => {
      setNewMaterialName('');
      toggle(false);
    }, [toggle]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
          addMaterial();
        }
      },
      [addMaterial]
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
        className={cn(cls.create_category, cls.create_material_input, {
          [cls.create_category_open]: isOpen
        })}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Input
              key={isOpen.toString()}
              placeholder="Название материала"
              value={newMaterialName}
              onChange={(event) =>
                setNewMaterialName(event.currentTarget.value)
              }
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className={cls.new_btns}>
              <button
                type="button"
                disabled={!newMaterialName}
                onClick={addMaterial}
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
