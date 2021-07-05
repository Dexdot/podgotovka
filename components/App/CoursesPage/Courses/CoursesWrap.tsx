import React, { useMemo, useState } from 'react';

import { useCourses } from '@/api/app/hooks/courses/useCourses';
import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';
import { CourseStatus } from '@/types/app/courses';

import { Courses } from './Courses';
import cls from './Course.module.scss';
import { statuses, statusesMap } from './helpers';

type Props = {
  subjectID: number;
};

export const CoursesWrap: React.FC<Props> = ({ subjectID }) => {
  const [status, setStatus] = useState<DropdownType>(statusesMap.published);

  const filters = useMemo(
    () => ({
      subject_id: subjectID,
      status: status.id as CourseStatus
    }),
    [subjectID, status.id]
  );

  const courses = useCourses(filters);

  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const arr = courses || [];
    if (!search) return arr;
    return arr.filter((c) => {
      if (c.name) {
        return c.name.toLowerCase().includes(search.toLowerCase());
      }

      return false;
    });
  }, [courses, search]);

  return (
    <div>
      <ul className={cls.filters}>
        <li>
          <Input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Поиск"
            search
          />
        </li>
        <li>
          <Dropdown
            items={statuses}
            value={status}
            onChange={(d) => setStatus(d)}
          />
        </li>
      </ul>

      {courses && <Courses courses={filtered} />}
    </div>
  );
};
