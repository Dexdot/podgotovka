import React, { useEffect, useRef, useState } from 'react';

import { Input } from '@/components/common/Input/Input';

import { onlyNumbers } from '@/utils/format';
import { TimeIcon } from './icons';
import cls from './InputTime.module.scss';

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export const InputTime: React.FC<Props> = ({ value, onChange }) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen && ref && ref.current) {
      // @ts-ignore
      ref.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={cls.root}>
      {isOpen ? (
        <div className={cls.input}>
          <Input
            ref={ref}
            value={String(value)}
            onChange={(e) =>
              onChange(Number(onlyNumbers(e.currentTarget.value)))
            }
            onBlur={() => setOpen(false)}
          />
        </div>
      ) : (
        <button className={cls.btn} type="button" onClick={() => setOpen(true)}>
          <TimeIcon />
          {value} мин.
        </button>
      )}
    </div>
  );
};
