import React, { useState } from 'react';
import cn from 'classnames';

import { useWindowClick } from '@/hooks/useWindowClick';
import { AddButton } from '@/components/common/AddButton/AddButton';

import cls from './Types.module.scss';
import { WebinarIcon, ExamIcon, ExtraIcon } from './icons';

export const Types: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  useWindowClick(({ target }) => {
    const el = target as HTMLElement;
    if (el && !el.closest(`.${cls.root}`)) {
      setOpen(false);
    }
  });

  return (
    <div className={cn(cls.root, { [cls.root_open]: isOpen })}>
      <AddButton text="Добавить занятие" onClick={() => setOpen(!isOpen)} />

      <ul className={cls.list}>
        <li>
          <button type="button" onClick={() => null}>
            <WebinarIcon />
            Вебинар
          </button>
        </li>
        <li>
          <button type="button" onClick={() => null}>
            <ExamIcon />
            Пробник
          </button>
        </li>
        <li>
          <button type="button" onClick={() => null}>
            <ExtraIcon />
            Дополнительное занятие
          </button>
        </li>
      </ul>
    </div>
  );
};
