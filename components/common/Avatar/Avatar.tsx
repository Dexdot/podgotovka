/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useImage } from '@/hooks/useImage';
import { COLORS } from '@/utils/consts';
import { randomColor } from '@/utils/randomColor';

import cls from './Avatar.module.scss';

type AvatarUser = {
  id: number;
  name: string;
};

type Props = {
  // Link props
  href?: string;
  // Props
  src?: string;
  size?: number;
  user?: AvatarUser;
  style?: ElementCSSInlineStyle;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function Avatar({
  href,
  src,
  size,
  user,
  style,
  onClick
}: Props): JSX.Element {
  const [image, , error] = useImage(src || '');
  const showPlaceholder = useMemo(() => !!error || !src, [src, error]);

  const computedStyle = useMemo(() => {
    const s = `${size}px`;

    return {
      width: s,
      height: s,
      minWidth: s,
      backgroundImage: `url(${image || ''})`,
      ...style
    };
  }, [size, image, style]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) onClick(e);
    },
    [onClick]
  );

  return (
    <div className={cls.avatar} style={computedStyle}>
      <>
        {onClick && (
          <button
            className={cls.avatar_btn}
            type="button"
            onClick={handleClick}
          >
            <span>Аватар</span>
          </button>
        )}

        <div className={cls.border}>
          {href && (
            <Link href={href}>
              <a href={href} className={cls.link} />
            </Link>
          )}
        </div>

        {showPlaceholder && (
          <div
            className={cls.placeholder}
            style={{
              backgroundColor: user?.id ? randomColor(user.id) : COLORS.primary,
              fontSize: (size || 32) / 2.25
            }}
          >
            {user?.name ? user.name[0].toUpperCase() : '?'}
          </div>
        )}
      </>
    </div>
  );
}

Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  size: 32,
  src: '',
  href: '',
  user: null,
  onClick: null,
  style: {}
};
