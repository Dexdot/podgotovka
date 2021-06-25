import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { UsersContext } from '@/store/users';

import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { Avatar } from '@/components/common/Avatar/Avatar';

import { statuses, roles } from './helpers';
import cls from './Users.module.scss';

export const Table: React.FC = observer(() => {
  const { users } = useContext(UsersContext);

  const subjects = useSubjects();

  const updateUserStatus = (userId: number, newStatus: string): void => {
    // call updateUser() from store here
    console.log(userId, newStatus);
  };

  return (
    <div className={cls.table}>
      <div className={cn(cls.row, cls.table_header)}>
        <p>Имя</p>
        <p>Предмет</p>
        <p>Роль</p>
        <p>Статус</p>
      </div>
      {users.map((user) => (
        <div key={user.id} className={cls.row}>
          <div className={cls.user_info}>
            <Avatar src={user.photo_link} size={48} />
            <div className={cls.name_and_login}>
              <Link href={`/app/users/${user.id}`}>
                <a href={`/app/users/${user.id}`} className={cls.user_name}>
                  {user.name}
                </a>
              </Link>
              <p className={cls.user_login}>{user.login}</p>
            </div>
          </div>
          <div className={cn(cls.flex_center, cls.subject_and_role)}>
            {subjects &&
              subjects.find((item) => item.id === user.subject.id)?.name}
          </div>
          <div className={cn(cls.flex_center, cls.subject_and_role)}>
            {roles.find((item) => item.id === user.role)?.text}
          </div>
          <div className={cls.user_status}>
            <Dropdown
              items={statuses}
              value={
                statuses.find(
                  (item) => item.id === user.is_active.toString()
                ) || null
              }
              onChange={(newStatus) => updateUserStatus(user.id, newStatus.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
});
