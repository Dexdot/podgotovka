import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import { AuthContext } from '@/store/auth';

import cls from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo';
import { HeaderAvatar } from './HeaderAvatar';
import { HeaderAvatarStudent } from './HeaderAvatarStudent';

export const Header: React.FC = observer(() => {
  const { isStudent } = useContext(AuthContext);
  const logoHref = isStudent ? '/' : '/app';

  return (
    <header className={cls.root}>
      <div className={cls.container}>
        <div className={cls.left}>
          <Link href={logoHref}>
            <a href={logoHref}>
              <HeaderLogo />
            </a>
          </Link>
        </div>

        {isStudent ? <HeaderAvatarStudent /> : <HeaderAvatar />}
      </div>
    </header>
  );
});
