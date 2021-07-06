import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import cls from './SidebarNav.module.scss';
import { BoardIcon, TasksIcon, LibraryIcon } from './icons';

const PATHS = {
  subjects: '/subjects',
  homeworks: '/homeworks',
  library: '/library'
};

export const StudentSidebarNav: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={cls.root}>
      <ul>
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
          <Link href={PATHS.library}>
            <a
              className={cn({
                [cls.link_active]: pathname.startsWith(PATHS.library)
              })}
              href={PATHS.library}
            >
              <LibraryIcon />
              Читальня
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
