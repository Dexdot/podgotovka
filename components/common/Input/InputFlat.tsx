import React, { forwardRef } from 'react';

import cls from './Input.module.scss';
import { InputProps as Props, defaultProps } from './InputProps';

export const InputFlat = forwardRef<any, Props>((props, ref) => {
  const { value, onChange, onBlur, disabled, placeholder, type, name } = props;

  return (
    <div className={cls.root}>
      <input
        ref={ref}
        className={cls.input_flat}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
      />
    </div>
  );
});

InputFlat.displayName = 'InputFlat';
InputFlat.defaultProps = {
  ...defaultProps
};
