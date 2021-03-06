import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';

import { Button } from '@/components/common/Button/Button';
import { BackLink } from '@/components/common/BackLink/BackLink';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { DateTimePicker } from '@/components/common/DateTimePicker/DateTimePicker';

import { LessonEditContext } from '@/store/app/lesson-edit';
import { CreateLessonI, LessonType } from '@/types/app/lessons';
import { LessonsAPI } from '@/api/app/lessons';
import { showAlert } from '@/utils/network';
import { HWEditContext, HWEditStore } from '@/store/app/homework-edit';

import { LESSON_TYPES } from '@/utils/consts';
import cls from './LessonEdit.module.scss';
import { Dropdowns } from './Dropdowns';
import { BasicInfo } from './BasicInfo/BasicInfo';
import { Timecode } from './Timecode';
import { HomeworkOne } from './Homework/HomeworkOne';
import { InputTime } from './Homework/InputTime/InputTime';
import { HomeworkTwo } from './Homework/HomeworkTwo';

type Props = {
  lessonID?: number;
  isCreate?: boolean;
};

type CollapseType = 'basic' | 'hw_first' | 'hw_second' | 'timecodes' | '';

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

    // HW
    const { setHomeworkStore } = store;
    const [hwStore, setHWStore] = useState<HWEditStore>();
    useEffect(() => {
      if (lessonID) {
        const s = new HWEditStore(lessonID);
        setHWStore(s);
        s.fetchHW();
      }
    }, [lessonID]);

    useEffect(() => {
      if (hwStore) {
        setHomeworkStore(hwStore);
      }
    }, [setHomeworkStore, hwStore]);

    useEffect(() => {
      const countTestQuestions = lessonData?.count_test_questions;
      if (hwStore && countTestQuestions) {
        hwStore.setCountTestQuestions(countTestQuestions);
      }
    }, [hwStore, lessonData?.count_test_questions]);

    return (
      <div className={cls.root}>
        <BackLink
          href={
            store.lessonData?.subject_id
              ? `/app/subjects/${store.lessonData?.subject_id}/courses`
              : '/app/subjects'
          }
          text={
            store.lessonData?.subject_id
              ? '?????????????????? ?? ????????????????'
              : '?????????????????? ?? ??????????????????'
          }
        />

        <header className={cls.header}>
          <h1 className={cls.title}>{name || '?????????? ??????????????'}</h1>
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
            ??????????????????
          </Button>
        </header>

        <Dropdowns />

        <SectionCollapse
          isOpen={collapse === 'basic'}
          onClick={() => toggleCollapse('basic')}
          title="????????????????"
        >
          {(isCreate || !!lessonData) && <BasicInfo />}
        </SectionCollapse>

        {!isCreate && (
          <>
            {type && !lessonTypesWithoutHW.includes(type) && hwStore && (
              <HWEditContext.Provider value={hwStore}>
                <SectionCollapse
                  isOpen={collapse === 'hw_first'}
                  onClick={() => toggleCollapse('hw_first')}
                  title="???????????????? ?????????????? (?????????? 1)"
                  headerChildren={
                    <header className={cls.hw_header} style={{ zIndex: 3 }}>
                      <InputTime
                        value={hwStore.timeOne / 60}
                        onChange={(t) => hwStore.setTimeOne(t)}
                      />
                      <div className={cls.deadline}>
                        ?????????????? ???????? ????????????????????
                        <div className={cls.deadline_time}>
                          <DateTimePicker
                            dateFormat="d MMMM, yyyy"
                            date={hwStore.deadline}
                            onChange={(d) => {
                              if (d) {
                                hwStore.setDeadline(d);
                              }
                            }}
                          />
                        </div>
                        {!hwStore.isPartOneValid && (
                          <div className={cls.warning}>
                            <Image
                              src="/emoji/exclamation-mark.png"
                              width="22"
                              height="22"
                            />
                          </div>
                        )}
                      </div>
                    </header>
                  }
                >
                  <HomeworkOne />
                </SectionCollapse>

                <SectionCollapse
                  isOpen={collapse === 'hw_second'}
                  onClick={() => toggleCollapse('hw_second')}
                  title="???????????????? ?????????????? (?????????? 2)"
                  headerChildren={
                    <header className={cls.hw_header}>
                      <InputTime
                        value={hwStore.timeTwo / 60}
                        onChange={(t) => hwStore.setTimeTwo(t)}
                      />
                      <div className={cls.deadline}>
                        ?????????????? ???????? ????????????????????
                        <div className={cls.deadline_time}>
                          <DateTimePicker
                            dateFormat="d MMMM, yyyy"
                            date={hwStore.deadline}
                            onChange={(d) => {
                              if (d) {
                                hwStore.setDeadline(d);
                              }
                            }}
                          />
                        </div>
                        {!hwStore.isPartTwoValid && (
                          <div className={cls.warning}>
                            <Image
                              src="/emoji/exclamation-mark.png"
                              width="22"
                              height="22"
                            />
                          </div>
                        )}
                      </div>
                    </header>
                  }
                >
                  <HomeworkTwo />
                </SectionCollapse>
              </HWEditContext.Provider>
            )}

            {type !== LESSON_TYPES.examwork && (
              <SectionCollapse
                isOpen={collapse === 'timecodes'}
                onClick={() => toggleCollapse('timecodes')}
                title="????????????????"
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
