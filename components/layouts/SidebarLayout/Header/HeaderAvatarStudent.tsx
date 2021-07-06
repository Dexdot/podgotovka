import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar } from '@/components/common/Avatar/Avatar';
import { AuthContext } from '@/store/auth';
import { useWindowClick } from '@/hooks/useWindowClick';
import { useOwnStudentAccount } from '@/api/app/hooks/useOwnStudentAccount';

import cls from './Header.module.scss';
import { ExitIcon } from './icons';

export const HeaderAvatarStudent: React.FC = observer(() => {
  const router = useRouter();
  const { auth, remove } = useContext(AuthContext);
  const [ownAccount, loadOwnAccount] = useOwnStudentAccount();

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

  useEffect(() => {
    if (auth?.access_token) {
      loadOwnAccount();
    }
  }, [auth?.access_token, loadOwnAccount]);

  return (
    <div className={cls.right}>
      <Avatar
        src={ownAccount?.photo_link || ''}
        user={{ name: ownAccount?.name || '', id: ownAccount?.id || -1 }}
        onClick={() => setOpen(!isOpen)}
      />

      <ul className={cn(cls.right_list, { [cls.right_list_open]: isOpen })}>
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
