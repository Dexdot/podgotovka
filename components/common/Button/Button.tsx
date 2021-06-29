/* eslint-disable react/button-has-type */
import React, { useMemo } from 'react';
import cn from 'classnames';

import { Spinner } from '@/components/common/Spinner/Spinner';
import { COLORS } from '@/utils/consts';

import { ButtonProps, defaultProps } from './ButtonProps';
import cls from './Button.module.scss';

interface Props
  extends ButtonProps,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant,
  fullWidth,
  onClick,
  disabled,
  loading,
  ...rest
}: Props): JSX.Element {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGreen = variant === 'green';
  const isGrey = variant === 'grey';

  const loaderColor = useMemo(() => {
    if (isSecondary || isGrey) {
      return COLORS.primary;
    }

    return '#fff';
  }, [isSecondary, isGrey]);

  return (
    <button
      className={cn(cls.button, {
        [cls.button_fullwidth]: fullWidth,
        [cls.button_loading]: loading,
        [cls.button_primary]: isPrimary,
        [cls.button_secondary]: isSecondary,
        [cls.button_green]: isGreen,
        [cls.button_grey]: isGrey
      })}
      disabled={disabled}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <span className={cls.inner}>{children}</span>

      {loading && (
        <span className={cls.loader}>
          <Spinner color={loaderColor} size={16} />
        </span>
      )}
    </button>
  );
}

Button.displayName = 'Button';
Button.defaultProps = {
  ...defaultProps,
  onClick: null,
  disabled: false
};
