import React from 'react';

import { COLORS } from '@/utils/consts';
import cls from './Spinner.module.scss';

type Props = {
  size?: number;
  color?: string;
};

export const Spinner: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      style={{ '--color': color } as React.CSSProperties}
      width={size}
      height={size}
      className={cls.spinner}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
};

Spinner.defaultProps = {
  size: 32,
  color: COLORS.primary
};
