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
import { CoursesAPI } from '@/api/app/courses';
import { showAlert } from '@/utils/network';

import cls from './Course.module.scss';
import { CalendarIcon } from './icons';
import { Status } from './Status';
import { Lessons } from './Lessons/Lessons';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

const now = new Date();
now.setHours(0, 0, 0, 0);

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

  const [isCopying, setCopying] = useState(false);

  const duplicateCourse = async () => {
    setCopying(true);

    try {
      const { data } = await CoursesAPI.copyCourse(course.id, {
        time_start: course.time_start || now.getTime() / 1000,
        time_finish: course.time_finish || now.getTime() / 1000
      });
      router.push(`/app/courses/${data.id}`);
    } catch (error) {
      showAlert({ error });
    } finally {
      setCopying(false);
    }
  };

  const onActionClick = (a: ActionType) => {
    if (a === 'edit') {
      router.push(editHref);
    }

    if (a === 'copy') {
      duplicateCourse();
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
              <ActionsDropdown disabled={isCopying} onClick={onActionClick} />
            </li>
          </ul>
        </div>
      }
    >
      {description.length > 0 && (
        <div className={cls.description}>
          <TextEditor data={{ blocks: description }} readOnly resetStyles />
        </div>
      )}

      {isOpen && <Lessons courseID={course.id} />}
    </SectionCollapse>
  );
};
