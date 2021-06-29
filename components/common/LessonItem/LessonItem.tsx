import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { LessonI } from '@/types/lessons';
import { getDateText, toHHMM } from '@/utils/date';
import {
  ActionsDropdown,
  ActionType
} from '@/components/common/ActionsDropdown/ActionsDropdown';
import { LessonsAPI } from '@/api/lessons';
import { showAlert } from '@/utils/network';

import cls from './LessonItem.module.scss';
import { TimeIcon } from './icons';
import book from './book.svg';

type Props = {
  lesson: LessonI;
};

export const LessonItem: React.FC<Props> = ({ lesson }) => {
  const router = useRouter();

  // Date
  const dateStart = new Date(lesson.time_start);
  const dateText = `${getDateText(dateStart)}, ${toHHMM(dateStart)}`;

  // Copy
  const [isCopying, setCopying] = useState(false);

  const duplicateLesson = async () => {
    setCopying(true);

    try {
      const { data } = await LessonsAPI.copyLesson(lesson.id);
      router.push(`/app/lessons/${data.id}`);
    } catch (error) {
      showAlert({ error });
    } finally {
      setCopying(false);
    }
  };

  const onActionClick = (a: ActionType) => {
    if (a === 'edit') {
      router.push(`/app/lessons/${lesson.id}`);
    }

    if (a === 'copy') {
      duplicateLesson();
    }
  };

  return (
    <div className={cls.root}>
      <div>
        <p className={cls.time}>
          <TimeIcon />
          {dateText}
        </p>
        <p className={cls.name}>{lesson.name}</p>
      </div>
      <div className={cls.right}>
        <img src={book} alt="ДЗ" />
        {/* TODO: counter */}
        <div className={cls.counter}>X / Y</div>
        <ActionsDropdown onClick={onActionClick} disabled={isCopying} />
      </div>
    </div>
  );
};
