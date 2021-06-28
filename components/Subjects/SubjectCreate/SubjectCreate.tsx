/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { SubjectHeader } from '@/components/Subjects/SubjectHeader/SubjectHeader';

import { useDirections } from '@/hooks/useDirections';
import { DirectionType } from '@/types/common';
import { COLORS } from '@/utils/consts';
import { createSubject } from '@/api/subjects';

import { showAlert } from '@/utils/network';
import cls from './SubjectCreate.module.scss';
import { SubjectIcon } from './Icons';
import { DirectionCheckbox } from './DirectionCheckbox/DirectionCheckbox';
import { SubjectEdit } from '../SubjectEdit/SubjectEdit';

type CollapseType = 'info' | 'vector' | null;

export const SubjectCreate: React.FC = () => {
  const router = useRouter();

  const [color, setColor] = useState<string>(COLORS.primary);
  const [name, setName] = useState<string>('');

  const [isOpen, toggleOpen] = useState<CollapseType>(null);

  const [directions] = useDirections();
  const [directionID, setDirectionID] = useState<DirectionType>('USE');
  const selectedDirection = directions.find((d) => d.id === directionID);

  const openCollapse = (str: string): void => {
    if (str === isOpen) {
      toggleOpen(null);
    } else {
      if (str === 'vector') {
        toggleOpen('vector');
      }

      if (str === 'info') {
        toggleOpen('info');
      }
    }
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
        isOpen={isOpen === 'vector'}
        title="Направление"
        onClick={() => openCollapse('vector')}
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
          isOpen={isOpen === 'info'}
          onClick={() => openCollapse('info')}
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
