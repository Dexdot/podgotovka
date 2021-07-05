import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar } from '@/components/common/Avatar/Avatar';
import { AuthContext } from '@/store/auth';
import { useWindowClick } from '@/hooks/useWindowClick';

import cls from './Header.module.scss';
import { SettingsIcon, ExitIcon } from './icons';

export const HeaderAvatar: React.FC = observer(() => {
  const router = useRouter();
  const { auth, remove } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);
  const signout = () => {
    setOpen(false);
    remove();
    router.push('/signin');
  };

  useWindowClick((e) => {
    if (!e.target.closest(`.${cls.right}`)) {
      setOpen(false);
    }
  });

  return (
    <div className={cls.right}>
      {/* TODO: Set name, photo_link */}
      <Avatar
        user={{ name: auth?.access_token || '' }}
        onClick={() => setOpen(!isOpen)}
      />

      <ul className={cn(cls.right_list, { [cls.right_list_open]: isOpen })}>
        <li>
          {/* TODO: acc id */}
          <Link href="/app/users/1/edit">
            <a href="/app/users/1/edit" onClick={() => setOpen(false)}>
              <SettingsIcon />
              Настройки
            </a>
          </Link>
        </li>
        <li>
          <button type="button" onClick={() => signout()}>
            <ExitIcon />
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
});
