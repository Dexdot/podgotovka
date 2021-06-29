/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import type { OutputBlockData } from '@editorjs/editorjs';

import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import {
  ActionsDropdown,
  ActionType
} from '@/components/common/ActionsDropdown/ActionsDropdown';

import { CourseI } from '@/types/courses';
import { getDateText } from '@/utils/date';

import cls from './Course.module.scss';
import { CalendarIcon } from './icons';
import { Status } from './Status';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

type Props = {
  course: CourseI;
  isOpen: boolean;
  onOpenClick: () => void;
};

export const Course: React.FC<Props> = ({ course, isOpen, onOpenClick }) => {
  const router = useRouter();
  const editHref = `/app/courses/${course.id}`;

  const [description, setDescription] = useState<OutputBlockData[]>([]);

  useEffect(() => {
    if (course.description) {
      setDescription(JSON.parse(course.description));
    }
  }, [course.description]);

  // Date
  const dateStart = course.time_start
    ? new Date(course.time_start * 1000)
    : null;
  const dateFinish = course.time_finish
    ? new Date(course.time_finish * 1000)
    : null;

  const period =
    dateStart && dateFinish ? (
      <div className={cls.period}>
        <CalendarIcon />
        {getDateText(dateStart)} - {getDateText(dateFinish)}
      </div>
    ) : null;

  const onActionClick = (a: ActionType) => {
    if (a === 'edit') {
      router.push(editHref);
    }
  };

  return (
    <SectionCollapse
      title={course.name || ''}
      isOpen={isOpen}
      onClick={onOpenClick}
      headerChildren={
        <div className={cls.header}>
          {period}
          <ul className={cn(cls.tools, { [cls.tools_visible]: isOpen })}>
            <li>
              <Status course={course} />
            </li>
            <li>
              <ActionsDropdown onClick={onActionClick} />
            </li>
          </ul>
        </div>
      }
    >
      {description.length > 0 && (
        <TextEditor data={{ blocks: description }} readOnly resetStyles />
      )}
      <p>Все занятия в этом курсе</p>
    </SectionCollapse>
  );
};
