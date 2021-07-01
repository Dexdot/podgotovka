import React from 'react';
import dynamic from 'next/dynamic';

import { MaterialI, TODO_MATERIAL_DESC } from '../helpers';

import cls from './Material.module.scss';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

interface PropsI {
  material: MaterialI | null;
  editMode: boolean;
}

export const Editor: React.FC<PropsI> = ({ material, editMode }) => {
  return (
    <div className={cls.editor_wrapper}>
      <h2>{material?.name}</h2>
      <TextEditor
        data={{
          blocks: TODO_MATERIAL_DESC
        }}
        readOnly={!editMode}
      />
      <div className={cls.editor_statistics}>
        <div>
          <span>{String.fromCodePoint(0x1f44d)}</span>
          251
        </div>
        <div>
          <span>{String.fromCodePoint(0x1f44e)}</span>
          39
        </div>
      </div>
    </div>
  );
};
