import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { Button } from '@/components/common/Button/Button';
import { Tabs } from '@/components/common/Tabs/Tabs';

import { TariffLevelType } from '@/types/common';
import { SubjectI } from '@/types/subjects';
import { useSubjects } from '@/api/hooks/subjects/useSubjects';
import { CourseEditContext } from '@/store/course-edit';

import cls from './CourseEdit.module.scss';
import { SubjectIcon } from './icons';
import { Subjects } from './Subjects';
import { BasicInfo } from './BasicInfo/BasicInfo';
import { Tariff } from './Tariff/Tariff';

type Props = {
  subjectID: number;
  isCreate?: boolean;
};

export const CourseEdit: React.FC<Props> = observer(
  ({ subjectID, isCreate }) => {
    // Collapse
    const [collapse, setCollapse] = useState<'basic' | 'tariff' | 'subject'>(
      'basic'
    );

    // Store
    const store = useContext(CourseEditContext);

    // Subjects
    const subjects = useSubjects();
    const { subject, setSubject } = store;

    useEffect(() => {
      if (isCreate && subjects) {
        const initialSubject = subjects.find(
          (s) => s.id === subjectID
        ) as SubjectI;

        setSubject(initialSubject);
      }
    }, [subjects, isCreate, subjectID, setSubject]);

    // Tariff
    const tabs = [
      { id: 'many', text: 'Несколько уровней' },
      { id: 'one', text: 'Один уровень' }
    ];
    const [selectedTab, selectTab] = useState<TariffLevelType>();
    const { levels: courseLevels } = store;

    useEffect(() => {
      if (isCreate) {
        selectTab('many');
      }

      if (courseLevels) {
        selectTab(courseLevels.length > 1 ? 'many' : 'one');
      }
    }, [isCreate, courseLevels]);

    const isTariffOpen = collapse === 'tariff';

    return (
      <div className={cls.root}>
        <header className={cls.header}>
          <h1 className={cls.title}>Создание курса</h1>
          <Button disabled>Сохранить</Button>
        </header>

        <SectionCollapse
          isOpen={collapse === 'subject'}
          onClick={() => setCollapse('subject')}
          title="Предмет"
          headerChildren={
            subject ? (
              <div className={cls.subject}>
                <SubjectIcon />
                {subject.name}
              </div>
            ) : null
          }
        >
          {subjects && subject && <Subjects subjects={subjects} />}
        </SectionCollapse>

        <SectionCollapse
          isOpen={collapse === 'basic'}
          onClick={() => setCollapse('basic')}
          title="Основная информация"
        >
          <BasicInfo />
        </SectionCollapse>

        <SectionCollapse
          isOpen={isTariffOpen}
          onClick={() => setCollapse('tariff')}
          title="Тарифы"
          headerChildren={
            isTariffOpen && selectedTab ? (
              <div className={cls.tabs}>
                <Tabs
                  tabs={tabs}
                  activeTab={selectedTab}
                  onClick={(v) => selectTab(v as TariffLevelType)}
                />
              </div>
            ) : null
          }
        >
          {isTariffOpen && selectedTab && <Tariff type={selectedTab} />}
        </SectionCollapse>
      </div>
    );
  }
);
