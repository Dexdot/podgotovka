import React, { useState } from 'react';
import cn from 'classnames';

import { useWindowClick } from '@/hooks/useWindowClick';

import cls from './ActionsDropdown.module.scss';
import { CopyIcon, EditIcon, MoreIcon } from './icons';

type Props = {
  onClick: (type: ActionType) => void;
};

export type ActionType = 'edit' | 'copy';

export const ActionsDropdown: React.FC<Props> = ({ onClick }) => {
  const [isOpen, setOpen] = useState(false);

  useWindowClick(({ target }) => {
    const el = target as HTMLElement;
    if (el && !el.closest(`.${cls.root}`)) {
      setOpen(false);
    }
  });

  return (
    <div className={cn(cls.root, { [cls.root_open]: isOpen })}>
      <button
        className={cls.more_btn}
        type="button"
        onClick={() => setOpen(!isOpen)}
      >
        <MoreIcon />
      </button>

      <ul className={cls.list}>
        <li>
          <button
            type="button"
            onClick={() => {
              onClick('edit');
              setOpen(false);
            }}
          >
            <EditIcon />
            Изменить
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              onClick('copy');
              setOpen(false);
            }}
          >
            <CopyIcon />
            Создать копию
          </button>
        </li>
      </ul>
    </div>
  );
};
