import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from '@/components/common/Input/Input';

import { LevelI, TariffLevelType } from '@/types/common';
import { CourseEditContext } from '@/store/app/course-edit';
import { numberWithSpaces, onlyNumbers } from '@/utils/format';

import cls from './Tariff.module.scss';

type Props = {
  type: TariffLevelType;
  levels: LevelI[];
};

const currency = '₽';

export const Levels: React.FC<Props> = observer(({ type, levels }) => {
  // Store
  const store = useContext(CourseEditContext);

  const { levelsWithPrice, setLevelPrice, setLevelsWithPrice } = store;

  useEffect(() => {
    if (!levelsWithPrice) {
      setLevelsWithPrice(levels.map((l) => ({ ...l, price: 0 })));
    } else {
      const isOneLvl =
        levelsWithPrice.length === 1 && levelsWithPrice[0].id === -1;

      if (!isOneLvl) {
        const newLevels = levels.map((l) => {
          const foundedLevel = levelsWithPrice.find((lv) => lv.id === l.id);
          const price = foundedLevel ? foundedLevel.price : 0;
          return { ...l, price };
        });

        setLevelsWithPrice(newLevels);
      }
    }
  }, [levels]);

  return (
    <div className={cls.levels}>
      <p className={cls.levels_label}>
        {type === 'many' ? 'Цены уровней' : 'Цена'}, {currency}
      </p>

      {levelsWithPrice && (
        <ul className={cls.levels_list}>
          {levelsWithPrice.map((l) => (
            <li key={l.id} className={cls.column}>
              <div className={cls.level_item}>
                {type === 'many' && <b>{l.name}</b>}

                <Input
                  value={String(numberWithSpaces(l.price))}
                  onChange={(e) =>
                    setLevelPrice(l.id, onlyNumbers(e.currentTarget.value))
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
