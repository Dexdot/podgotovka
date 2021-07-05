import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { useWindowClick } from '@/hooks/useWindowClick';
import { AddButton } from '@/components/common/AddButton/AddButton';
import { LessonType } from '@/types/lessons';

import cls from './Types.module.scss';
import { WebinarIcon, ExamIcon, ExtraIcon } from './icons';

type Props = {
  courseID: number;
};

export const Types: React.FC<Props> = ({ courseID }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  useWindowClick(({ target }) => {
    const el = target as HTMLElement;
    if (el && !el.closest(`.${cls.root}`)) {
      setOpen(false);
    }
  });

  const onTypeClick = (type: LessonType) => {
    router.push(`/app/courses/${courseID}/lesson?type=${type}`);
  };

  return (
    <div className={cn(cls.root, { [cls.root_open]: isOpen })}>
      <AddButton text="Добавить занятие" onClick={() => setOpen(!isOpen)} />

      <ul className={cls.list}>
        <li>
          <button type="button" onClick={() => onTypeClick('webinar')}>
            <WebinarIcon />
            Вебинар
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onTypeClick('examwork')}>
            <ExamIcon />
            Пробник
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onTypeClick('extra_lesson')}>
            <ExtraIcon />
            Дополнительное занятие
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onTypeClick('psychologist')}>
            <ExtraIcon />
            Вебинар с психологом
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onTypeClick('motivation')}>
            <ExtraIcon />
            Мотивационный вебинар
          </button>
        </li>
      </ul>
    </div>
  );
};
