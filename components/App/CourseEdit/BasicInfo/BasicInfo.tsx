import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { Input } from '@/components/common/Input/Input';
import { DateTimePicker } from '@/components/common/DateTimePicker/DateTimePicker';

import { CourseEditContext } from '@/store/app/course-edit';

import cls from './BasicInfo.module.scss';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

export const BasicInfo: React.FC = observer(() => {
  // Store
  const store = useContext(CourseEditContext);

  // Name
  const { name, setName } = store;

  // Description
  const { description, setDescription } = store;

  // Period dates
  const { dateStart, setDateStart, dateFinish, setDateFinish } = store;

  return (
    <div className={cls.root}>
      <div className={cls.name}>
        <Input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Название курса"
        />
      </div>

      <div className={cls.period}>
        <p>Период</p>

        <div className={cls.period_row}>
          <DateTimePicker
            dateFormat="dd.MM.yyyy"
            date={dateStart}
            onChange={(d) => {
              if (d) setDateStart(d);
            }}
          />

          <DateTimePicker
            dateFormat="dd.MM.yyyy"
            date={dateFinish}
            onChange={(d) => {
              if (d) setDateFinish(d);
            }}
          />
        </div>
      </div>

      <div className={cls.hr} />

      <div className={cls.description}>
        <TextEditor
          data={{ blocks: description }}
          onChange={(d) => setDescription(d.blocks)}
          placeholder="Добавьте описание курса сюда"
          resetStyles
        />
      </div>
    </div>
  );
});
