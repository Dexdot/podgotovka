import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { MaterialI } from '@/types/library';

import { LibraryContext } from '@/store/library';

import { DropdownItem } from '@/components/common/Dropdown/Dropdown';
import { ConfirmModal } from '@/components/modals/ConfirmModal/ConfirmModal';

import { HeaderReadOnly } from './Header/HeaderReadOnly';
import { HeaderEdit } from './Header/HeaderEdit';
import { ACTION_DELETE } from './helpers';

import cls from './Material.module.scss';

interface PropsI {
  nextMaterial: MaterialI | null;
  subjectId: number;
  editMode: boolean;
}

export const Header: React.FC<PropsI> = observer(
  ({ subjectId, editMode, nextMaterial }) => {
    const router = useRouter();

    const { material, copyMaterial, removeMaterial, updateMaterialStatus } =
      useContext(LibraryContext);

    const [isOpen, toggle] = useState<boolean>(false);

    const handleCopy = useCallback(() => {
      copyMaterial(material.id).then((res) => {
        router.push(
          `/library/subject/${subjectId}/material/${res.id}${
            editMode ? '/edit' : ''
          }`
        );
      });
    }, [material, copyMaterial, router, subjectId, editMode]);

    const handleDelete = useCallback(() => {
      removeMaterial(material.id).then(() => {
        if (nextMaterial) {
          router.push(
            `/library/subject/${subjectId}/material/${nextMaterial.id}/edit`
          );
        } else {
          router.push(`/library/subject/${subjectId}/create`);
        }
        toggle(false);
      });
    }, [material, removeMaterial, subjectId, router, nextMaterial]);

    const handleMoreClick = useCallback(
      (value: DropdownItem) => {
        if (value.id === ACTION_DELETE) {
          toggle(true);
        } else {
          handleCopy();
        }
      },
      [handleCopy]
    );

    const handleStatusChange = useCallback(() => {
      updateMaterialStatus(material.id);
    }, [updateMaterialStatus, material]);

    return (
      <>
        <div className={cls.header}>
          {editMode ? (
            <HeaderEdit
              onMoreClick={handleMoreClick}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <HeaderReadOnly subjectId={subjectId} onCopy={handleCopy} />
          )}
        </div>
        <ConfirmModal
          isOpen={isOpen}
          title="Удаление материала"
          text={`Вы уверены, что хотите удалить материал "${material?.name}"?`}
          confirmText="Удалить"
          cancelText="Отмена"
          close={() => toggle(false)}
          onButtonClick={handleDelete}
          containerClass={cls.modal_delete}
        />
      </>
    );
  }
);
