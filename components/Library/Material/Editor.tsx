import React, { useContext } from 'react';
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
}

export const Editor: React.FC<PropsI> = observer(({ editMode }) => {
  const { material, laodingMaterial } = useContext(LibraryContext);

  return (
    <div className={cls.editor_wrapper}>
      {!editMode && <h2>{material.name}</h2>}
      {laodingMaterial === 'done' && (
        <TextEditor
          data={{
            blocks: []
          }}
          readOnly={!editMode}
        />
      )}
      {!editMode && laodingMaterial === 'done' && (
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
