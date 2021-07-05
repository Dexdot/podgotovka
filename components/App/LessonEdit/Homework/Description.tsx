import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { OutputBlockData } from '@editorjs/editorjs';

import { AddButton } from '@/components/common/AddButton/AddButton';

import cls from './Homework.module.scss';

type Props = {
  blocks: OutputBlockData[];
  onChange: (b: OutputBlockData[]) => void;
};

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

export const Description: React.FC<Props> = ({ blocks, onChange }) => {
  const [isOpen, setOpen] = useState(blocks.length > 0);

  return (
    <div className={cls.editor}>
      <p className={cls.label}>Пояснение</p>
      <p className={cls.subtitle}>
        Пояснение увидит ученик после выполнения всего домашнего задания
      </p>
      {isOpen ? (
        <TextEditor
          data={{ blocks }}
          onChange={(d) => onChange(d.blocks)}
          placeholder="Добавьте пояснение сюда"
          resetStyles
        />
      ) : (
        <AddButton text="Добавить пояснение" onClick={() => setOpen(true)} />
      )}
    </div>
  );
};
