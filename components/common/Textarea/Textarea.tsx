import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import cls from './Textarea.module.scss';
import { TextareaProps as Props, defaultProps } from './TextareaProps';

export const Textarea: React.FC<Props> = (props) => {
  const { value, onChange, onBlur, disabled, placeholder, name, errorText } =
    props;

  const ref = useRef(null);

  useEffect(() => {
    if (!ref || !ref.current) return;

    // @ts-ignore
    const el = ref.current as HTMLTextAreaElement;
    el.style.height = 'auto';

    const h = el.scrollHeight;
    if (el.value) {
      el.style.height = `${h}px`;
    } else {
      el.style.height = '';
    }
  }, [value]);

  return (
    <div className={cls.root}>
      <textarea
        ref={ref}
        className={cn(cls.textarea, {
          [cls.textarea_error]: !!errorText
        })}
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
};

Textarea.displayName = 'Textarea';
Textarea.defaultProps = {
  ...defaultProps
};
