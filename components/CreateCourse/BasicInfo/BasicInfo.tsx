import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { OutputBlockData } from '@editorjs/editorjs';

import { Input } from '@/components/common/Input/Input';

import { DateTimePicker } from '@/components/common/DateTimePicker/DateTimePicker';
import cls from './BasicInfo.module.scss';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

export const BasicInfo: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateFinish, setDateFinish] = useState<Date>(new Date());
  const [description, setDescription] = useState<OutputBlockData[]>([]);

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
            showTimeInput
            date={dateStart}
            onChange={(d) => {
              if (d) setDateStart(d);
            }}
          />

          <DateTimePicker
            showTimeInput
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
};
