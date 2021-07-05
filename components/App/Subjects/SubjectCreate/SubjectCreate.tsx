/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { SubjectHeader } from '@/components/App/Subjects/SubjectHeader/SubjectHeader';
import { SubjectEdit } from '@/components/App/Subjects/SubjectEdit/SubjectEdit';

import { useDirections } from '@/hooks/useDirections';
import { DirectionType } from '@/types/common';
import { COLORS } from '@/utils/consts';
import { createSubject } from '@/api/app/subjects';
import { showAlert } from '@/utils/network';

import cls from './SubjectCreate.module.scss';
import { SubjectIcon } from './Icons';
import { DirectionCheckbox } from './DirectionCheckbox/DirectionCheckbox';

type CollapseType = 'direction' | 'info' | '';

export const SubjectCreate: React.FC = () => {
  const router = useRouter();

  const [color, setColor] = useState<string>(COLORS.primary);
  const [name, setName] = useState<string>('');

  const [collapse, setCollapse] = useState<CollapseType>('');

  const [directions] = useDirections();
  const [directionID, setDirectionID] = useState<DirectionType>('USE');
  const selectedDirection = directions.find((d) => d.id === directionID);

  const toggleCollapse = (type: CollapseType): void => {
    setCollapse(collapse === type ? '' : type);
  };

  const isFormValid = useMemo(() => {
    if (!name || !color) {
      return false;
    }

    return true;
  }, [color, name]);

  const create = async () => {
    const subjectData = {
      name,
      color,
      direction: directionID
    };

    try {
      await createSubject(subjectData);
      router.push('/app/subjects');
    } catch (error) {
      showAlert({ error });
    }
  };

  return (
    <div className={cls.subject_create}>
      <div className={cls.subject_create_header}>
        <SubjectHeader
          title="Создание предмета"
          buttonText="Сохранить"
          onClick={create}
          disabled={!isFormValid}
        />
      </div>

      <SectionCollapse
        isOpen={collapse === 'direction'}
        title="Направление"
        onClick={() => toggleCollapse('direction')}
        headerChildren={
          <div className={cls.selected_value}>
            <SubjectIcon />
            {selectedDirection?.text}
          </div>
        }
      >
        <DirectionCheckbox
          directionID={directionID}
          setDirectionID={setDirectionID}
          subjects={directions}
        />
      </SectionCollapse>

      <div className={cls.subject_create_section}>
        <SectionCollapse
          isOpen={collapse === 'info'}
          onClick={() => toggleCollapse('info')}
          title="Основная информация"
        >
          <SubjectEdit
            placeholderNameSubject="Название предмета"
            nameColor={color}
            nameSubject={name}
            setColor={setColor}
            setName={setName}
          />
        </SectionCollapse>
      </div>
    </div>
  );
};
