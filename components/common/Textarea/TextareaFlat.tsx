import React, { useEffect, useRef } from 'react';

import cls from './Textarea.module.scss';
import { TextareaProps as Props, defaultProps } from './TextareaProps';

export const TextareaFlat: React.FC<Props> = (props) => {
  const {
    value,
    onChange,
    onBlur,
    disabled,
    placeholder,
    name,
    initialHeight
  } = props;

  const ref = useRef(null);

  useEffect(() => {
    if (!ref || !ref.current) return;

    // @ts-ignore
    const el = ref.current as HTMLTextAreaElement;
    el.style.height = initialHeight ? `${initialHeight}px` : 'auto';

    const h = el.scrollHeight;
    if (el.value) {
      el.style.height = `${h}px`;
    } else {
      el.style.height = '';
    }
  }, [value, initialHeight]);

  return (
    <div className={cls.root}>
      <textarea
        ref={ref}
        className={cls.textarea_flat}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
      />
    </div>
  );
};

TextareaFlat.displayName = 'TextareaFlat';
TextareaFlat.defaultProps = {
  ...defaultProps
};
