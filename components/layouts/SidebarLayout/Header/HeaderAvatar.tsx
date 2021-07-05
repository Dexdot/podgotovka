import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar } from '@/components/common/Avatar/Avatar';
import { AuthContext } from '@/store/auth';
import { useWindowClick } from '@/hooks/useWindowClick';
import { useOwnAccount } from '@/api/app/hooks/useOwnAccount';

import cls from './Header.module.scss';
import { SettingsIcon, ExitIcon } from './icons';

export const HeaderAvatar: React.FC = observer(() => {
  const router = useRouter();
  const { auth, remove } = useContext(AuthContext);
  const [ownAccount, loadOwnAccount] = useOwnAccount();

  const [isOpen, setOpen] = useState(false);
  const signout = () => {
    setOpen(false);
    remove();
    router.push('/app/signin');
  };

  useWindowClick((e) => {
    if (!e.target.closest(`.${cls.right}`)) {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (auth?.access_token) {
      loadOwnAccount();
    }
  }, [auth?.access_token, loadOwnAccount]);

  return (
    <div className={cls.right}>
      <Avatar
        src={ownAccount?.photo_link || ''}
        user={{ name: ownAccount?.name || '' }}
        onClick={() => setOpen(!isOpen)}
      />

      <ul className={cn(cls.right_list, { [cls.right_list_open]: isOpen })}>
        {ownAccount && (
          <li>
            <Link href={`/app/users/${ownAccount.id}/edit`}>
              <a
                href={`/app/users/${ownAccount.id}/edit`}
                onClick={() => setOpen(false)}
              >
                <SettingsIcon />
                Настройки
              </a>
            </Link>
          </li>
        )}
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
