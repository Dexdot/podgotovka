import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/common/Button/Button';
import { BackLink } from '@/components/common/BackLink/BackLink';

import { LessonEditContext } from '@/store/lesson-edit';
import { CreateLessonI, LessonType } from '@/types/lessons';
import { LessonsAPI } from '@/api/lessons';
import { showAlert } from '@/utils/network';

import cls from './LessonEdit.module.scss';
import { Dropdowns } from './Dropdowns';
import { SectionCollapse } from '../common/SectionCollapse/SectionCollapse';
import { BasicInfo } from './BasicInfo/BasicInfo';

type Props = {
  lessonID?: number;
  isCreate?: boolean;
};

type CollapseType =
  | 'basic'
  | 'homework_first'
  | 'homework_second'
  | 'timecodes'
  | '';

export const LessonEdit: React.FC<Props> = observer(
  ({ lessonID, isCreate }) => {
    const router = useRouter();

    const store = useContext(LessonEditContext);
    const { lessonData, isLoading, fetchLesson, saveLesson, name } = store;

    // Collapse
    const [collapse, setCollapse] = useState<CollapseType>('basic');
    const toggleCollapse = (type: CollapseType) => {
      setCollapse(collapse === type ? '' : type);
    };

    // Create lesson
    const createLesson = async () => {
      const type = store.type as LessonType;

      const data: CreateLessonI = {
        name,
        type,
        course_id: store.courseID,
        time_start: store.dateStart.getTime() / 1000,
        description: store.description ? JSON.stringify(store.description) : '',
        youtube_link: store.youtubeLink,
        files: store.files
      };

      try {
        const r = await LessonsAPI.createLesson(data);
        router.push(`/app/lessons/${r.data.id}`);
      } catch (error) {
        showAlert({ error });
      }
    };

    // Fetch lesson
    useEffect(() => {
      if (!isCreate && lessonID) {
        fetchLesson(lessonID);
      }
    }, [lessonID, isCreate, fetchLesson]);

    return (
      <div className={cls.root}>
        <BackLink href="/app/subjects" text="Вернуться к предметам" />

        <header className={cls.header}>
          <h1 className={cls.title}>{name || 'Новое занятие'}</h1>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={() => {
              if (isCreate) {
                createLesson();
              } else if (lessonID) {
                saveLesson(lessonID);
              }
            }}
          >
            Сохранить
          </Button>
        </header>

        <Dropdowns />

        <SectionCollapse
          isOpen={collapse === 'basic'}
          onClick={() => toggleCollapse('basic')}
          title="Основное"
        >
          {(isCreate || !!lessonData) && <BasicInfo />}
        </SectionCollapse>

        {!isCreate && <></>}
      </div>
    );
  }
);
