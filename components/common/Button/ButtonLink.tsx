import React, { useMemo } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { Spinner } from '@/components/common/Spinner/Spinner';
import { COLORS } from '@/utils/consts';

import { ButtonProps, defaultProps } from './ButtonProps';
import cls from './Button.module.scss';

interface Props extends ButtonProps {
  href: string;
}

export function ButtonLink({
  children,
  variant,
  fullWidth,
  href,
  loading,
  ...rest
}: Props): JSX.Element {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGreen = variant === 'green';

  const loaderColor = useMemo(() => {
    if (isSecondary) {
      return COLORS.primary;
    }

    return '#fff';
  }, [isSecondary]);

  return (
    <Link href={href}>
      <a
        className={cn(cls.button, {
          [cls.button_fullwidth]: fullWidth,
          [cls.button_loading]: loading,
          [cls.button_primary]: isPrimary,
          [cls.button_secondary]: isSecondary,
          [cls.button_green]: isGreen
        })}
        href={href}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        <span className={cls.inner}>{children}</span>

        {loading && (
          <span className={cls.loader}>
            <Spinner color={loaderColor} size={16} />
          </span>
        )}
      </a>
    </Link>
  );
}

ButtonLink.displayName = 'ButtonLink';
ButtonLink.defaultProps = {
  ...defaultProps
};
