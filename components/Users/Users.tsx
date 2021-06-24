import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';
import { Avatar } from '@/components/common/Avatar/Avatar';

import {
  TODO_ROLE_ITEMS,
  TODO_STATUS_ITEMS,
  TODO_SUBJECT_ITEMS,
  TODO_USERS
} from './helpers';

import cls from './Users.module.scss';

export const Users: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<DropdownItem | null>(null);
  const [subject, setSubject] = useState<DropdownItem | null>(null);
  const [role, setRole] = useState<DropdownItem | null>(null);

  const updateUserStatus = (userId: number, newStatus: string): void => {
    // update user status
  };

  useEffect(() => {
    // fetch users
  }, [search, status, subject, role]);

  useEffect(() => {
    // fetch available roles, subjects and statuses
  }, []);

  return (
    <section className={cls.root}>
      <header className={cls.flex_center}>
        <h1>Пользователи</h1>
        <ButtonLink href="/app/users/create">Добавить пользователя</ButtonLink>
      </header>

      <div className={cn(cls.filters, cls.flex_center)}>
        <div className={cn(cls.search, cls.input)}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Поиск"
            search
          />
        </div>

        <div className={cn(cls.input)}>
          <Dropdown
            items={TODO_STATUS_ITEMS}
            value={status}
            onChange={setStatus}
            placeholder="Статус"
          />
        </div>
        <div className={cn(cls.input)}>
          <Dropdown
            items={TODO_SUBJECT_ITEMS}
            value={subject}
            onChange={setSubject}
            placeholder="Предмет"
          />
        </div>
        <div className={cn(cls.input)}>
          <Dropdown
            items={TODO_ROLE_ITEMS}
            value={role}
            onChange={setRole}
            placeholder="Роль"
          />
        </div>
      </div>

      <div className={cls.table}>
        <div className={cn(cls.row, cls.table_header)}>
          <p>Имя</p>
          <p>Предмет</p>
          <p>Роль</p>
          <p>Статус</p>
        </div>
        {TODO_USERS.map((user) => (
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
              {
                TODO_SUBJECT_ITEMS.find((item) => item.id === user.subject_id)
                  ?.text
              }
            </div>
            <div className={cn(cls.flex_center, cls.subject_and_role)}>
              {TODO_ROLE_ITEMS.find((item) => item.id === user.role_id)?.text}
            </div>
            <div className={cls.user_status}>
              <Dropdown
                items={TODO_STATUS_ITEMS}
                value={
                  TODO_STATUS_ITEMS.find(
                    (item) => item.id === user.status_id
                  ) || null
                }
                onChange={(newStatus) =>
                  updateUserStatus(user.id, newStatus.id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
