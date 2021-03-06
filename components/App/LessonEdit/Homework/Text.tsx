import React from 'react';
import dynamic from 'next/dynamic';
import { OutputBlockData } from '@editorjs/editorjs';

import cls from './Homework.module.scss';

type Props = {
  blocks: OutputBlockData[];
  onChange: (b: OutputBlockData[]) => void;
};

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

export const Text: React.FC<Props> = ({ blocks, onChange }) => {
  return (
    <div className={cls.editor}>
      <p className={cls.label}>Вопрос</p>
      <TextEditor
        data={{ blocks }}
        onChange={(d) => onChange(d.blocks)}
        placeholder="Добавьте описание вопроса сюда"
        resetStyles
      />
    </div>
  );
};
