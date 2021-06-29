import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/common/Button/Button';
import { BackLink } from '@/components/common/BackLink/BackLink';
import { LessonEditContext } from '@/store/lesson-edit';

import cls from './LessonEdit.module.scss';
import { Dropdowns } from './Dropdowns';

type Props = {
  isCreate?: boolean;
};

export const LessonEdit: React.FC<Props> = observer(({ isCreate }) => {
  const store = useContext(LessonEditContext);
  const { isLoading, name } = store;

  return (
    <div className={cls.root}>
      <BackLink href="/app/subjects" text="Вернуться к предметам" />
      <header className={cls.header}>
        <h1 className={cls.title}>{name || 'Новое занятие'}</h1>
        <Button loading={isLoading} disabled={isLoading}>
          Сохранить
        </Button>
      </header>

      <Dropdowns />
    </div>
  );
});
