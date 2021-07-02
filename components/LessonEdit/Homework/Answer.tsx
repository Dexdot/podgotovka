/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';

import { Input } from '@/components/common/Input/Input';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';

import cls from './Homework.module.scss';

type Props = {
  id: number;
  checked: boolean;
  onChecked: (v: boolean) => void;
  answer: string;
  onAnswerChange: (v: string) => void;
};

export const Answer: React.FC<Props> = ({
  id,
  checked,
  onChecked,
  answer,
  onAnswerChange
}) => {
  const ID = String(id);

  return (
    <div>
      <p className={cls.label}>Ответы</p>
      <div className={cls.full_match}>
        <Checkbox
          id={ID}
          checked={checked}
          onChange={(e) => onChecked(e.currentTarget.checked)}
        />
        <label htmlFor={ID}>Засчитывать только полное совпадение</label>
      </div>

      <Input
        value={answer}
        onChange={(e) => onAnswerChange(e.currentTarget.value)}
        placeholder="Напишите верный ответ"
      />
    </div>
  );
};
