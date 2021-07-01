import React from 'react';

import { declension, onlyNumbers } from '@/utils/format';
import { Input } from '@/components/common/Input/Input';

import cls from './Homework.module.scss';

type Props = {
  weight: number;
  onChange: (v: number) => void;
};

const MIN_WEIGHT = 1;
const MAX_WEIGHT = 25;

export const Weight: React.FC<Props> = ({ weight, onChange }) => {
  const handleChange = (v: string) => {
    const num = Number(onlyNumbers(v));
    let value = num;
    if (value < MIN_WEIGHT) {
      value = MIN_WEIGHT;
    }
    if (value > MAX_WEIGHT) {
      value = MAX_WEIGHT;
    }
    onChange(value);
  };

  return (
    <div>
      <p className={cls.label}>Вес вопроса</p>
      <p className={cls.subtitle}>
        Укажите, сколько баллов будет даваться за полностью верный ответ на
        данный вопрос
      </p>
      <div className={cls.weight}>
        <Input
          value={String(weight)}
          onChange={(e) => handleChange(e.currentTarget.value)}
        />
        <p>{declension(weight, 'балл', 'балла', 'баллов')}</p>
      </div>
    </div>
  );
};
