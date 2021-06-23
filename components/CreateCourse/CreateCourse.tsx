import React from 'react';

import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { Button } from '@/components/common/Button/Button';

import cls from './CreateCourse.module.scss';
import { SubjectIcon } from './icons';

export const CreateCourse: React.FC = () => {
  return (
    <div className={cls.root}>
      <header className={cls.header}>
        <h1 className={cls.title}>Создание курса</h1>
        <Button disabled>Сохранить</Button>
      </header>

      <SectionCollapse
        isOpen={false}
        title="Предмет"
        headerChildren={
          <div className={cls.subject}>
            <SubjectIcon />
            Название предмета
          </div>
        }
      />
    </div>
  );
};
