import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';

import { LibraryContext } from '@/store/library';

import cls from './Material.module.scss';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

interface PropsI {
  editMode: boolean;
  onChange: (data: any) => void;
}

export const Editor: React.FC<PropsI> = observer(({ editMode, onChange }) => {
  const { material, laodingMaterial } = useContext(LibraryContext);
  const [ready, toggleReady] = useState<boolean>(false);

  useEffect(() => {
    toggleReady(false);
  }, [material.id]);

  return (
    <div className={cls.editor_wrapper}>
      {!editMode && <h2>{material.name}</h2>}
      {laodingMaterial === 'done' && (
        <TextEditor
          data={{
            blocks: material.text ? JSON.parse(material.text) : []
          }}
          readOnly={!editMode}
          placeholder={editMode ? 'Добавьте содержание материала сюда' : ''}
          onChange={(data) => onChange(data.blocks)}
          onReady={() => toggleReady(true)}
        />
      )}
      {!editMode && laodingMaterial === 'done' && ready && (
        <div className={cls.editor_statistics}>
          <div>
            <span>{String.fromCodePoint(0x1f44d)}</span>
            {material.likes_number}
          </div>
          <div>
            <span>{String.fromCodePoint(0x1f44e)}</span>
            {material.dislikes_number}
          </div>
        </div>
      )}
    </div>
  );
});
