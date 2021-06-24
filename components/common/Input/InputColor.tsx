import React, { useRef } from 'react';
import cn from 'classnames';

import cls from './Input.module.scss';
import { InputProps as Props, defaultProps } from './InputProps';

export const InputColor: React.FC<Props> = (props) => {
  const { value, onChange, onBlur, disabled, name } = props;
  const ref = useRef(null);

  const onClick = () => {
    if (ref && ref.current) {
      // @ts-ignore
      ref.current.click();
    }
  };

  return (
    <div className={cn(cls.root, cls.root_color)}>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className={cls.btn_color}
        type="button"
        onClick={onClick}
        style={{ backgroundColor: value }}
      />
      <input
        ref={ref}
        className={cls.input_color}
        type="color"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
      />
    </div>
  );
};

InputColor.displayName = 'InputColor';
InputColor.defaultProps = {
  ...defaultProps
};
