import React, { forwardRef } from 'react';
import cn from 'classnames';
import cls from './Input.module.scss';
import { SearchIcon } from './icons';
import { InputProps, defaultProps } from './InputProps';

interface Props extends InputProps {
  search?: boolean;
}

export const Input = forwardRef<any, Props>((props, ref) => {
  const {
    value,
    onChange,
    onBlur,
    disabled,
    placeholder,
    type,
    name,
    errorText,
    search
  } = props;

  return (
    <div className={cls.root}>
      {search && <SearchIcon />}

      <input
        ref={ref}
        className={cn(cls.input, {
          [cls.input_error]: !!errorText,
          [cls.input_search]: search
        })}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
      />
      <span
        className={cn(cls.error_wrap, { [cls.error_wrap_active]: !!errorText })}
      >
        {errorText && <span className={cls.error}>{errorText}</span>}
      </span>
    </div>
  );
});

Input.displayName = 'Input';
Input.defaultProps = {
  ...defaultProps,
  search: false
};