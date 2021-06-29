import React, { useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { UsersContext } from '@/store/users';

import { Header } from './Header';
import { Bio } from './Bio';

import cls from './User.module.scss';

export const User: React.FC = observer(() => {
  const router = useRouter();
  const { id } = router.query;

  const { fetchUserDetails, userDetails, updateUser } =
    useContext(UsersContext);

  useEffect(() => {
    if (id) {
      fetchUserDetails(Number(id));
    }
  }, [id]);

  const updateUserStatus = useCallback(
    (is_active: boolean) => {
      updateUser({ id: Number(id), is_active });
    },
    [updateUser, id]
  );

  return (
    <section className={cls.root}>
      <>
        <Header details={userDetails} onStatusChange={updateUserStatus} />

        <Bio details={userDetails} />
      </>
    </section>
  );
});
