import React, { useContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import { LessonEditContext } from '@/store/lesson-edit';
import { useCourses } from '@/api/hooks/courses/useCourses';

import cls from './LessonEdit.module.scss';

const filters = {};

export const Dropdowns: React.FC = observer(() => {
  const store = useContext(LessonEditContext);

  // Course
  const { courseID, setCourseID } = store;
  const courses = useCourses(filters);
  const coursesItems = useMemo<DropdownItem[]>(() => {
    if (courses) {
      const filtered = courses.filter((c) => !!c.name);
      return filtered.map((c) => ({ id: String(c.id), text: c.name || '' }));
    }

    return [];
  }, [courses]);

  const [course, setCourse] = useState<DropdownItem>();

  useEffect(() => {
    if (courseID !== -1) {
      const strID = String(courseID);
      const finded = coursesItems.find((c) => c.id === strID);
      if (finded) {
        setCourse(finded);
      }
    }
  }, [courseID, coursesItems]);

  const onCourseChange = async (v: DropdownItem) => {
    setCourseID(Number(v.id));
  };

  return (
    <ul className={cls.dropdowns}>
      {course && (
        <li>
          <Dropdown
            items={coursesItems}
            value={course}
            onChange={onCourseChange}
          />
        </li>
      )}
    </ul>
  );
});
