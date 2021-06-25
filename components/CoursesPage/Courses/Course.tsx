/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Baige } from '@/components/common/Baige/Baige';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import { CourseI, CourseStatus } from '@/types/courses';
import { getDateText } from '@/utils/date';

import cls from './Course.module.scss';
import { CalendarIcon, CopyIcon, EditIcon } from './icons';
import { getStatusColor, statuses, statusesMap } from './helpers';

type Props = {
  course: CourseI;
};

// TODO: Add API
export const Course: React.FC<Props> = ({ course }) => {
  const editHref = `/app/courses/${course.id}`;

  // Date
  const dateStart = course.time_start
    ? new Date(course.time_start * 1000)
    : null;
  const dateFinish = course.time_finish
    ? new Date(course.time_finish * 1000)
    : null;

  // Status
  const [status, setStatus] = useState<CourseStatus>(course.status);
  const [statusUI, setStatusUI] = useState<DropdownItem>();

  useEffect(() => {
    if (status) setStatusUI(statusesMap[status]);
  }, [status]);

  const statusColor = useMemo(() => {
    const statusID = statusUI?.id as CourseStatus | undefined;
    return getStatusColor(statusID);
  }, [statusUI]);

  const onStatusChange = (v: DropdownItem) => {
    const newStatus = v.id as CourseStatus;
    setStatus(newStatus);
  };

  return (
    <div className={cls.course}>
      <Link href={editHref}>
        <a
          href={editHref}
          className={cls.image}
          style={{ backgroundImage: `url(${course.photo_link})` }}
        />
      </Link>

      <div className={cls.info}>
        {dateStart && dateFinish && (
          <div className={cls.date}>
            <Baige>
              <CalendarIcon />
              {getDateText(dateStart)} - {getDateText(dateFinish)},{' '}
              {dateFinish.getFullYear()}
            </Baige>
          </div>
        )}

        <h3 className={cls.name}>{course.name}</h3>
      </div>

      <ul className={cls.tools}>
        <li>
          <button className={cls.tool_btn} type="button">
            <CopyIcon />
          </button>
        </li>
        <li>
          <Link href={editHref}>
            <a href={editHref} className={cls.tool_btn}>
              <EditIcon />
            </a>
          </Link>
        </li>
        <li>
          {statusUI && (
            <Dropdown
              beforeText={
                <span
                  style={{ background: statusColor }}
                  className={cls.status_dot}
                />
              }
              items={statuses}
              value={statusUI}
              onChange={onStatusChange}
            />
          )}
        </li>
      </ul>
    </div>
  );
};
