import React from 'react';
import Link from 'next/link';
import cls from './BackLink.module.scss';
import { ChevronIcon } from './icons';

type Props = {
  href: string;
  text: string;
};

export const BackLink: React.FC<Props> = ({ text, href }) => {
  return (
    <Link href={href}>
      <a className={cls.root} href={href}>
        <ChevronIcon />
        {text}
      </a>
    </Link>
  );
};
