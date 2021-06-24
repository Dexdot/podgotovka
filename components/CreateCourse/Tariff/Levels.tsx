import React, { useEffect, useState } from 'react';

import { LevelType, TariffLevelType } from '@/types/common';
import { Input } from '@/components/common/Input/Input';

import { onlyNumbers } from '@/utils/format';
import cls from './Tariff.module.scss';

type Props = {
  type: TariffLevelType;
  levels: LevelType[];
};

const currency = '₽';

interface LevelWithPriceI extends LevelType {
  price: number;
}

export const Levels: React.FC<Props> = ({ type, levels }) => {
  const [levelsWithPrice, setLevels] = useState<LevelWithPriceI[]>(
    levels.map((l) => ({ ...l, price: 0 }))
  );

  useEffect(() => {
    const newLevels = levels.map((l) => {
      const foundedLevel = levelsWithPrice.find((lv) => lv.id === l.id);
      const price = foundedLevel ? foundedLevel.price : 0;
      return { ...l, price };
    });
    setLevels(newLevels);
  }, [levels]);

  const setLevelPrice = (id: number, value: string) => {
    setLevels((ls) => {
      return ls.map((l) => {
        if (l.id === id) {
          return { ...l, price: Number(value) };
        }

        return l;
      });
    });
  };

  return (
    <div className={cls.levels}>
      <p className={cls.levels_label}>
        {type === 'many' ? 'Цены уровней' : 'Цена'}, {currency}
      </p>

      <ul className={cls.levels_list}>
        {levelsWithPrice.map((l) => (
          <li key={l.id} className={cls.column}>
            <div className={cls.level_item}>
              {type === 'many' && <b>{l.name}</b>}

              <Input
                value={String(l.price)}
                onChange={(e) =>
                  setLevelPrice(l.id, onlyNumbers(e.currentTarget.value))
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
