import React from 'react';

import { TariffLevelType } from '@/types/common';
import { useLevels } from '@/api/hooks/useLevels';

import cls from './Tariff.module.scss';
import { Levels } from './Levels';
import { Options } from './Options/Options';

type Props = {
  type: TariffLevelType;
};

export const Tariff: React.FC<Props> = ({ type }) => {
  const isMany = type === 'many';
  const levels = useLevels();
  const levelsByType = isMany ? levels : levels?.slice(0, 1);

  return (
    <div className={cls.root}>
      {levelsByType && (
        <>
          <Levels type={type} levels={levelsByType} />
          <Options />
        </>
      )}
    </div>
  );
};
