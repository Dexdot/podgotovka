/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';

import { HWAnswerType } from '@/types/app/homeworks';
import { DropdownType, Dropdown } from '@/components/common/Dropdown/Dropdown';

import cls from './Homework.module.scss';

type Props = {
  type: HWAnswerType;
  onChange: (t: HWAnswerType) => void;
};

const types: DropdownType[] = [
  { id: 'text', text: 'Текст' },
  { id: 'file', text: 'Файл' },
  { id: 'audio', text: 'Аудио' },
  { id: 'text_with_file', text: 'Текст с файлом' }
];

export const Type: React.FC<Props> = ({ type, onChange }) => {
  const initial = types.find((t) => t.id === type) as DropdownType;
  const [typeUI, setTypeUI] = useState<DropdownType>(initial);

  const handleChange = (v: DropdownType) => {
    onChange(v.id as HWAnswerType);
  };

  useEffect(() => {
    if (type) {
      const finded = types.find((t) => t.id === type) as DropdownType;
      if (finded) {
        setTypeUI(finded);
      }
    }
  }, [type]);

  return (
    <div>
      <p className={cls.label}>Тип ответа</p>
      <p className={cls.subtitle}>
        Укажите, в каком виде ученик должен давать ответ
      </p>
      <Dropdown value={typeUI} onChange={handleChange} items={types} />
    </div>
  );
};
