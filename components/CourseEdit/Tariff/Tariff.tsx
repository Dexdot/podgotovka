import React, { useContext, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { TariffLevelType } from '@/types/common';
import { useLevels } from '@/api/hooks/useLevels';
import { CourseEditContext } from '@/store/course-edit';

import cls from './Tariff.module.scss';
import { Levels } from './Levels';
import { Options } from './Options/Options';

type Props = {
  type: TariffLevelType;
};

export const Tariff: React.FC<Props> = observer(({ type }) => {
  const { levelsWithPrice } = useContext(CourseEditContext);
  const levels = useLevels();

  const isMany = useMemo(() => type === 'many', [type]);
  const levelsByType = useMemo(
    () => (isMany ? levels : levels?.slice(0, 1)),
    [isMany, levels]
  );

  return (
    <div className={cls.root}>
      {levelsByType && (
        <>
          <Levels type={type} levels={levelsByType} />
          {levelsWithPrice && levelsWithPrice.length > 0 && <Options />}
        </>
      )}
    </div>
  );
});
