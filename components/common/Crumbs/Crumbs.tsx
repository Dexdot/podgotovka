import React from 'react';
import Link from 'next/link';

import cls from './Crumbs.module.scss';

type Crumb = {
  to: string;
  text: string;
};

interface PropsI {
  items: Crumb[];
}

export const Crumbs: React.FC<PropsI> = ({ items }) => {
  return (
    <div className={cls.breadcrumbs}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return <span>{item.text}</span>;
        }

        return (
          <>
            <Link href={item.to}>{item.text}</Link>
            <span>/</span>
          </>
        );
      })}
    </div>
  );
};
