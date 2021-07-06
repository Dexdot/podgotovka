import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { MaterialI } from '@/types/library';

import { LibraryContext } from '@/store/library';

import { DropdownType } from '@/components/common/Dropdown/Dropdown';
import { ConfirmModal } from '@/components/modals/ConfirmModal/ConfirmModal';

import { HeaderReadOnly } from './Header/HeaderReadOnly';
import { HeaderEdit } from './Header/HeaderEdit';
import { ACTION_DELETE } from './helpers';

import cls from './Material.module.scss';

interface PropsI {
  nextMaterial: MaterialI | null;
  subjectId: number;
  editMode: boolean;
  materialText: any;
}

export const Header: React.FC<PropsI> = observer(
  ({ subjectId, editMode, nextMaterial, materialText }) => {
    const router = useRouter();

    const {
      material,
      copyMaterial,
      removeMaterial,
      updateMaterialStatus,
      updateMaterial
    } = useContext(LibraryContext);

    const [isOpen, toggle] = useState<boolean>(false);

    const handleCopy = useCallback(() => {
      copyMaterial(material.id).then((res) => {
        router.push(
          editMode
            ? `/app/library/subject/${subjectId}/material/${res.id}/edit`
            : `/library/subject/${subjectId}/material/${res.id}`
        );
      });
    }, [material, copyMaterial, router, subjectId, editMode]);

    const handleDelete = useCallback(() => {
      removeMaterial(material.id).then(() => {
        if (nextMaterial) {
          router.push(
            `/app/library/subject/${subjectId}/material/${nextMaterial.id}/edit`
          );
        } else {
          router.push(`/app/library/subject/${subjectId}/create`);
        }
        toggle(false);
      });
    }, [material, removeMaterial, subjectId, router, nextMaterial]);

    const handleMoreClick = useCallback(
      (value: DropdownType) => {
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

    const handleSave = useCallback(() => {
      updateMaterial({
        material_id: material.id,
        text: JSON.stringify(materialText),
        name: material.name
      });
    }, [updateMaterial, material, materialText]);

    return (
      <>
        <div className={cls.header}>
          {editMode ? (
            <HeaderEdit
              onMoreClick={handleMoreClick}
              onStatusChange={handleStatusChange}
              onSave={handleSave}
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
