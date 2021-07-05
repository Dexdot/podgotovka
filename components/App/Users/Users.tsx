import React from 'react';

import { ButtonLink } from '@/components/common/Button/ButtonLink';

import { Search } from './Search';
import { Table } from './Table';

import cls from './Users.module.scss';

export const Users: React.FC = () => {
  return (
    <section className={cls.root}>
      <header className={cls.flex_center}>
        <h1>Пользователи</h1>
        <ButtonLink href="/app/users/create">Добавить пользователя</ButtonLink>
      </header>

      <Search />
      <Table />
    </section>
  );
};
