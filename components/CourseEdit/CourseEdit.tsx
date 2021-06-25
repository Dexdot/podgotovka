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
  courseID: number;
};

type CollapseType = 'basic' | 'tariff' | 'subject' | '';

export const CourseEdit: React.FC<Props> = observer(({ courseID }) => {
  // Collapse
  const [collapse, setCollapse] = useState<CollapseType>('basic');
  const toggleCollapse = (type: CollapseType) => {
    setCollapse(collapse === type ? '' : type);
  };

  // Store
  const store = useContext(CourseEditContext);

  // Subjects
  const subjects = useSubjects();
  const { subject } = store;

  // Tariff
  const tabs = [
    { id: 'many', text: 'Несколько уровней' },
    { id: 'one', text: 'Один уровень' }
  ];
  const [selectedTab, selectTab] = useState<TariffLevelType>();
  const { levels: courseLevels } = store;

  useEffect(() => {
    if (courseLevels) {
      selectTab(courseLevels.length > 1 ? 'many' : 'one');
    }
  }, [courseLevels]);

  const isTariffOpen = collapse === 'tariff';

  return (
    <div className={cls.root}>
      <header className={cls.header}>
        <h1 className={cls.title}>Создание курса</h1>
        <Button disabled>Сохранить</Button>
      </header>

      <SectionCollapse
        isOpen={collapse === 'subject'}
        onClick={() => toggleCollapse('subject')}
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

      {/* <SectionCollapse
        isOpen={collapse === 'basic'}
        onClick={() => toggleCollapse('basic')}
        title="Основная информация"
      >
        <BasicInfo />
      </SectionCollapse> */}

      {/* <SectionCollapse
        isOpen={isTariffOpen}
        onClick={() => toggleCollapse('tariff')}
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
      </SectionCollapse> */}
    </div>
  );
});
