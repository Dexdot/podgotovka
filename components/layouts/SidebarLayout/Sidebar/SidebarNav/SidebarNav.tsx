import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import cls from './SidebarNav.module.scss';
import { UsersIcon, BoardIcon, TasksIcon, OptionsIcon } from './icons';

const PATHS = {
  users: '/app/users',
  subjects: '/app/subjects',
  homeworks: '/app/homeworks',
  options: '/app/options'
};

export const SidebarNav: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={cls.root}>
      <ul>
        <li>
          <Link href={PATHS.users}>
            <a
              className={cn({
                [cls.link_active]: pathname.startsWith(PATHS.users)
              })}
              href={PATHS.users}
            >
              <UsersIcon />
              Пользователи
            </a>
          </Link>
        </li>
        <li>
          <Link href={PATHS.subjects}>
            <a
              className={cn({
                [cls.link_active]: pathname.startsWith(PATHS.subjects)
              })}
              href={PATHS.subjects}
            >
              <BoardIcon />
              Предметы
            </a>
          </Link>
        </li>
        <li>
          <Link href={PATHS.homeworks}>
            <a
              className={cn({
                [cls.link_active]: pathname.startsWith(PATHS.homeworks)
              })}
              href={PATHS.homeworks}
            >
              <TasksIcon />
              Домашки
            </a>
          </Link>
        </li>
        <li>
          <Link href={PATHS.options}>
            <a
              className={cn({
                [cls.link_active]: pathname.startsWith(PATHS.options)
              })}
              href={PATHS.options}
            >
              <OptionsIcon />
              Опции
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
