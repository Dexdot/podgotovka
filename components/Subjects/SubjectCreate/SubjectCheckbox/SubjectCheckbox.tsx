/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSubjects } from '@/api/hooks/useSubjects';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';

import { useSubjectsCheck } from '@/api/hooks/useSubjectsCheck';
import { DropdownItemSub } from '@/components/common/Dropdown/Dropdown';
import cls from './SubjectCheckbox.module.scss';

type Props = {
  collapse: number | null;
  setCollapse: (el: number) => void;
  subjects: DropdownItemSub[];
};

export const SubjectCheckbox: React.FC<Props> = ({
  collapse,
  setCollapse,
  subjects
}) => {
  return (
    <div className={cls.checkbox}>
      <h3>Выберите роль пользователя</h3>

      {subjects.map((item) => (
        <div key={item.id} className={cls.checkbox_item}>
          <Checkbox
            id={`role_${item.id}`}
            onChange={() => setCollapse(Number(item.id))}
            checked={collapse?.toString() === item.id}
          />
          <label htmlFor={`role_${item.id}`}>{item.text}</label>
        </div>
      ))}
    </div>
  );
};
