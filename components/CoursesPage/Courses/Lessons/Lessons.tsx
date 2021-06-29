import React, { useState } from 'react';
import cn from 'classnames';

import { useCourseLessons } from '@/api/hooks/lessons/useLessons';
import { AddButton } from '@/components/common/AddButton/AddButton';
import { LessonItem } from '@/components/common/LessonItem/LessonItem';

import cls from './Lessons.module.scss';
import { ListIcon, CalendarIcon } from './icons';
import { Types } from './Types/Types';

type Props = {
  courseID: number;
};

type ViewType = 'list' | 'calendar';

const filters = {};

export const Lessons: React.FC<Props> = ({ courseID }) => {
  const [view, setView] = useState<ViewType>('list');
  const lessons = useCourseLessons(courseID, filters);

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
          <ul className={cls.lessons}>
            {lessons.map((l) => (
              <li key={l.id}>
                <LessonItem lesson={l} />
              </li>
            ))}
          </ul>

          <Types />
        </div>
      )}
    </section>
  );
};
