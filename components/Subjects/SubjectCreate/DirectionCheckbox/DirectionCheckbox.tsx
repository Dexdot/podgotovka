/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';

import { DirectionItem, DirectionType } from '@/types/common';
import cls from './DirectionCheckbox.module.scss';

type Props = {
  directionID: DirectionType;
  setDirectionID: (el: DirectionType) => void;
  subjects: DirectionItem[];
};

export const DirectionCheckbox: React.FC<Props> = ({
  directionID,
  setDirectionID,
  subjects
}) => {
  return (
    <div className={cls.checkbox}>
      <h3>Выберте направление предмета</h3>

      {subjects.map((item) => (
        <div key={item.id} className={cls.checkbox_item}>
          <Checkbox
            id={`direction_${item.id}`}
            onChange={() => setDirectionID(item.id as DirectionType)}
            checked={directionID === item.id}
          />
          <label htmlFor={`direction_${item.id}`}>{item.text}</label>
        </div>
      ))}
    </div>
  );
};
