import React from 'react';

import { LevelType, OptionI } from '@/types/common';

import cls from './Options.module.scss';
import { Option } from './Option';

const options: OptionI[] = [
  { id: 1, name: 'Какая-то строковая опция', type: 'string' },
  { id: 2, name: 'Беседа единомышленников', type: 'numeric' },
  { id: 3, name: 'Хэлпер', type: 'boolean' }
];

type Props = {
  levels: LevelType[];
};

export const OptionsList: React.FC<Props> = ({ levels }) => {
  return (
    <ul className={cls.list}>
      {options.map((option) => (
        <li key={option.id}>
          <Option levels={levels} option={option} />
        </li>
      ))}
    </ul>
  );
};
