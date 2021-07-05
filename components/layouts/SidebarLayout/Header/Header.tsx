import React from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import cls from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo';
import { HeaderAvatar } from './HeaderAvatar';

export const Header: React.FC = observer(() => {
  return (
    <header className={cls.root}>
      <div className={cls.container}>
        <div className={cls.left}>
          <Link href="/">
            <a href="/">
              <HeaderLogo />
            </a>
          </Link>
        </div>

        <HeaderAvatar />
      </div>
    </header>
  );
});
