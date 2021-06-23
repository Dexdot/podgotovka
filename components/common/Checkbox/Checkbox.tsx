import React from 'react';
import cn from 'classnames';
import cls from './Checkbox.module.scss';
import { CheckboxIcon } from './CheckboxIcon';

interface Props {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function Checkbox({
  id,
  checked,
  onChange,
  disabled
}: Props): JSX.Element {
  return (
    <div
      className={cn(cls.container, {
        [cls.container_checked]: checked
      })}
    >
      <input
        className={cls.input}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={cls.label} htmlFor={id}>
        <CheckboxIcon />
      </label>
    </div>
  );
}

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  disabled: false
};
