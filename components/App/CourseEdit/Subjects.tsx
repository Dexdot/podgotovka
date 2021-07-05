import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { SubjectI } from '@/types/subjects';
import { CourseEditContext } from '@/store/course-edit';

import cls from './CourseEdit.module.scss';
import { Checkbox } from '../../common/Checkbox/Checkbox';

type Props = {
  subjects: SubjectI[];
};

export const Subjects: React.FC<Props> = observer(({ subjects }) => {
  const { subject, setSubject } = useContext(CourseEditContext);

  return (
    <div className={cls.subjects}>
      <p>Выберите предмет курса</p>

      <ul>
        {subjects.map((s) => {
          const id = `subject-select-${s.id}`;

          return (
            <li key={s.id}>
              <Checkbox
                id={id}
                checked={s.id === subject?.id}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setSubject(s);
                  }
                }}
              />
              <label htmlFor={id}>{s.name}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
