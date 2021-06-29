import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from '@/components/common/Input/Input';
import { CourseEditContext } from '@/store/course-edit';
import { onlyNumbers } from '@/utils/format';

import cls from './CourseEdit.module.scss';

export const Homework: React.FC = observer(() => {
  const { countTestQuestions, setCountTestQuestions } =
    useContext(CourseEditContext);

  return (
    <div>
      <p className={cls.homework_label}>
        Количество домашних заданий в тестовой части
      </p>
      <Input
        value={String(countTestQuestions)}
        onChange={(e) =>
          setCountTestQuestions(Number(onlyNumbers(e.currentTarget.value)))
        }
      />
      <p className={cls.homework_desc}>
        Это количество обязательных вопросов в тестовой части, которые учитель
        обязан будет заполнять в каждом вебинаре данного курса
      </p>
    </div>
  );
});
