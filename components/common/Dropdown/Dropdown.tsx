import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { useWindowClick } from '@/hooks/useWindowClick';

import cls from './Dropdown.module.scss';
import { DropdownIcon } from './DropdownIcon';

export type DropdownItem = {
  id: string;
  text: string;
};

export type DropdownItemSub = {
  id: string;
  text: string;
  value: string;
};

type Props = {
  beforeText?: React.ReactNode;
  placeholder?: string;
  items: DropdownItem[];
  value: DropdownItem | null;
  onChange: (item: DropdownItem) => void;
};

export const Dropdown: React.FC<Props> = ({
  beforeText,
  placeholder,
  value,
  items,
  onChange
}) => {
  const rootRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const showPlaceholder = !!placeholder && !value;
  const list = items.filter((item) => item.id !== value?.id);

  useWindowClick((e) => {
    const thisRoot = rootRef?.current;
    const clickedRoot = e.target.closest(`.${cls.root}`);

    if (clickedRoot !== thisRoot || !clickedRoot) {
      setOpen(false);
    }
  });

  return (
    <div className={cn(cls.root, { [cls.root_open]: isOpen })} ref={rootRef}>
      <button
        className={cn(cls.selected_btn, {
          [cls.selected_placeholder]: showPlaceholder
        })}
        type="button"
        onClick={() => setOpen(!isOpen)}
      >
        {beforeText}
        {showPlaceholder ? placeholder : value?.text}
        <DropdownIcon />
      </button>

      <ul className={cls.list}>
        {list.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
