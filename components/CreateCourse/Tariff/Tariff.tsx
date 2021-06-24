import React from 'react';

import { LevelType, TariffLevelType } from '@/types/common';

import cls from './Tariff.module.scss';
import { Levels } from './Levels';

type Props = {
  type: TariffLevelType;
};

const levels: LevelType[] = [
  { id: 1, name: 'Лайт' },
  { id: 2, name: 'Классик' },
  { id: 3, name: 'Армагедон' }
];

export const Tariff: React.FC<Props> = ({ type }) => {
  const isMany = type === 'many';

  return (
    <div className={cls.root}>
      <Levels type={type} levels={isMany ? levels : levels.slice(0, 1)} />
    </div>
  );
};
