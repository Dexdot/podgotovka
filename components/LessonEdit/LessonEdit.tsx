import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/common/Button/Button';
import { BackLink } from '@/components/common/BackLink/BackLink';

import { LessonEditContext } from '@/store/lesson-edit';
import { CreateLessonI, LessonType } from '@/types/lessons';
import { LessonsAPI } from '@/api/lessons';
import { showAlert } from '@/utils/network';

import { LESSON_TYPES } from '@/utils/consts';
import cls from './LessonEdit.module.scss';
import { Dropdowns } from './Dropdowns';
import { SectionCollapse } from '../common/SectionCollapse/SectionCollapse';
import { BasicInfo } from './BasicInfo/BasicInfo';
import { Timecode } from './Timecode';

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

const lessonTypesWithoutHW: LessonType[] = [
  LESSON_TYPES.psychologist,
  LESSON_TYPES.motivation
];

export const LessonEdit: React.FC<Props> = observer(
  ({ lessonID, isCreate }) => {
    const router = useRouter();

    const store = useContext(LessonEditContext);
    const { lessonData, isLoading, fetchLesson, saveLesson, name, type } =
      store;

    // Collapse
    const [collapse, setCollapse] = useState<CollapseType>('basic');
    const toggleCollapse = (t: CollapseType) => {
      setCollapse(collapse === t ? '' : t);
    };

    // Create lesson
    const createLesson = async () => {
      const data: CreateLessonI = {
        name,
        type: store.type as LessonType,
        course_id: store.courseID,
        time_start: store.dateStart.getTime() / 1000,
        description: store.description ? JSON.stringify(store.description) : '',
        youtube_link: store.youtubeLink,
        files: store.files,
        time_codes: store.timecode
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

        {!isCreate && (
          <>
            {type && !lessonTypesWithoutHW.includes(type) && (
              <>
                <SectionCollapse
                  isOpen={collapse === 'homework_first'}
                  onClick={() => toggleCollapse('homework_first')}
                  title="Домашнее задание (Часть 1)"
                >
                  HW 1
                </SectionCollapse>
                <SectionCollapse
                  isOpen={collapse === 'homework_second'}
                  onClick={() => toggleCollapse('homework_second')}
                  title="Домашнее задание (Часть 2)"
                >
                  HW 2
                </SectionCollapse>
              </>
            )}

            {type !== LESSON_TYPES.examwork && (
              <SectionCollapse
                isOpen={collapse === 'timecodes'}
                onClick={() => toggleCollapse('timecodes')}
                title="Таймкоды"
              >
                <Timecode />
              </SectionCollapse>
            )}
          </>
        )}
      </div>
    );
  }
);
