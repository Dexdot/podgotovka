import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import { Avatar } from '@/components/common/Avatar/Avatar';
import { AuthContext } from '@/store/auth';

import cls from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo';

export const Header: React.FC = observer(() => {
  const { auth } = useContext(AuthContext);

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

        <div className={cls.right}>
          {/* TODO: Change to user name */}
          <Avatar user={{ name: auth?.access_token || '' }} />
        </div>
      </div>
    </header>
  );
});
