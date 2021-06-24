import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { Button } from '@/components/common/Button/Button';
import { Tabs } from '@/components/common/Tabs/Tabs';
import { TariffLevelType } from '@/types/common';

import cls from './CreateCourse.module.scss';
import { SubjectIcon } from './icons';
import { BasicInfo } from './BasicInfo/BasicInfo';
import { Tariff } from './Tariff/Tariff';

export const CreateCourse: React.FC = () => {
  const router = useRouter();
  const subjectID = router.query.subject_id as string;

  const [collapse, setCollapse] = useState<'basic' | 'tariff'>('basic');
  const isTariffOpen = collapse === 'tariff';

  const tabs = [
    { id: 'many', text: 'Несколько уровней' },
    { id: 'one', text: 'Один уровень' }
  ];
  const [selectedLevel, selectLevel] = useState<TariffLevelType>('many');

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
            Название предмета с ID {subjectID}
          </div>
        }
      />

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
          isTariffOpen ? (
            <div className={cls.tabs}>
              <Tabs
                tabs={tabs}
                activeTab={selectedLevel}
                onClick={(v) => selectLevel(v as TariffLevelType)}
              />
            </div>
          ) : null
        }
      >
        <Tariff type={selectedLevel} />
      </SectionCollapse>
    </div>
  );
};
