import React, { useState } from 'react';
import cn from 'classnames';

import { useCourseLessons } from '@/api/hooks/lessons/useLessons';
import { AddButton } from '@/components/common/AddButton/AddButton';

import cls from './Lessons.module.scss';
import { ListIcon, CalendarIcon } from './icons';

type Props = {
  courseID: number;
};

type ViewType = 'list' | 'calendar';

const filters = {};
export const Lessons: React.FC<Props> = ({ courseID }) => {
  const lessons = useCourseLessons(courseID, filters);

  const [view, setView] = useState<ViewType>('list');

  return (
    <section>
      <header className={cls.header}>
        <b className={cls.title}>Все занятия в этом курсе</b>
        <ul className={cls.view_select}>
          <li>
            <button
              className={cn(cls.view_btn, {
                [cls.view_btn_active]: view === 'list'
              })}
              onClick={() => setView('list')}
              type="button"
            >
              <ListIcon />
            </button>
          </li>
          <li>
            <button
              className={cn(cls.view_btn, {
                [cls.view_btn_active]: view === 'calendar'
              })}
              onClick={() => setView('calendar')}
              type="button"
            >
              <CalendarIcon />
            </button>
          </li>
        </ul>
      </header>

      {lessons && (
        <div>
          {/* TODO: Lessons list */}
          <ul className={cls.lessons}>
            <li>lesson1</li>
            <li>lesson2</li>
          </ul>

          {/* TODO: Show lesson types */}
          <AddButton text="Добавить занятие" onClick={() => null} />
        </div>
      )}
    </section>
  );
};
