import React, { useCallback, useContext } from 'react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';

import { LessonEditContext } from '@/store/lesson-edit';
import { InputFlat } from '@/components/common/Input/InputFlat';
import { DateTimePicker } from '@/components/common/DateTimePicker/DateTimePicker';
import { Files } from '@/components/common/Files/Files';

import cls from './BasicInfo.module.scss';

const TextEditor = dynamic(
  () => import('@/components/common/TextEditor/TextEditor'),
  { ssr: false }
);

// TODO: Fields by lesson type
export const BasicInfo: React.FC = observer(() => {
  const store = useContext(LessonEditContext);

  const { name, setName } = store;
  const { description, setDescription } = store;
  const { youtubeLink, setYoutubeLink } = store;
  const { dateStart, setDateStart } = store;
  const { files, setFiles } = store;

  const onFilesChange = useCallback(
    (fs) => {
      setFiles(fs);
    },
    [setFiles]
  );

  return (
    <div>
      <div className={cls.name}>
        <InputFlat
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Напишите название занятия"
        />
      </div>
      <div className={cls.description}>
        <TextEditor
          data={{ blocks: description }}
          onChange={(d) => setDescription(d.blocks)}
          placeholder="Добавьте описание сюда"
          resetStyles
        />
      </div>
      <div className={cls.hr} />
      <h2 className={cls.label}>Ссылка на YouTube</h2>
      <div className={cls.youtube_link}>
        <InputFlat
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.currentTarget.value)}
          placeholder="Вставьте ссылку на видео или будущий стрим сюда"
        />
      </div>
      <div className={cls.hr} />
      <h2 className={cls.label}>Дата и время начала занятия</h2>
      <div>
        <DateTimePicker
          showTimeInput
          date={dateStart}
          onChange={(d) => {
            if (d) setDateStart(d);
          }}
        />
      </div>
      <div className={cls.hr} />
      <h2 className={cls.label}>Рабочая тетрадь</h2>
      <Files files={files} onChange={onFilesChange} />
    </div>
  );
});
