import React, { useContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';

import { LessonEditContext } from '@/store/app/lesson-edit';
import { useCourses } from '@/api/app/hooks/courses/useCourses';
import { LessonType } from '@/types/app/lessons';

import cls from './LessonEdit.module.scss';

const filters = {};
const types: DropdownType[] = [
  { id: 'webinar', text: 'Вебинар' },
  { id: 'examwork', text: 'Пробник' },
  { id: 'extra_lesson', text: 'Дополнительное занятие' },
  { id: 'psychologist', text: 'Вебинар с психологом' },
  { id: 'motivation', text: 'Мотивационный вебинар' }
];

export const Dropdowns: React.FC = observer(() => {
  const store = useContext(LessonEditContext);

  // Course
  const { courseID, setCourseID } = store;
  const courses = useCourses(filters);
  const coursesItems = useMemo<DropdownType[]>(() => {
    if (courses) {
      const filtered = courses.filter((c) => !!c.name);
      return filtered.map((c) => ({ id: String(c.id), text: c.name || '' }));
    }

    return [];
  }, [courses]);

  const [course, setCourse] = useState<DropdownType>();

  useEffect(() => {
    if (courseID !== -1) {
      const strID = String(courseID);
      const finded = coursesItems.find((c) => c.id === strID);
      if (finded) {
        setCourse(finded);
      }
    }
  }, [courseID, coursesItems]);

  const onCourseChange = async (v: DropdownType) => {
    setCourseID(Number(v.id));
  };

  // Type
  const { type, setType } = store;

  const [typeUI, setTypeUI] = useState<DropdownType>();

  useEffect(() => {
    const finded = types.find((t) => t.id === type);
    if (finded) {
      setTypeUI(finded);
    } else {
      const firstType = types[0];
      setType(firstType.id as LessonType);
    }
  }, [type, setType]);

  const onTypeChange = async (v: DropdownType) => {
    const t = v.id as LessonType;
    setType(t);
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

      {typeUI && (
        <li>
          <Dropdown items={types} value={typeUI} onChange={onTypeChange} />
        </li>
      )}
    </ul>
  );
});
