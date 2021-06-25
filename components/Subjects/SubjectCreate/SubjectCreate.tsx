/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';
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

export const SubjectCreate: React.FC = () => {
  const router = useRouter();

  const [color, setColor] = useState<string>(COLORS.primary);
  const [name, setName] = useState<string>('');

  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [isOpenSubject, toggleOpenSubject] = useState<boolean>(false);

  const [directions] = useDirections();
  const [directionID, setDirectionID] = useState<DirectionType>('USE');
  const selectedDirection = directions.find((d) => d.id === directionID);

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
        isOpen={isOpenSubject}
        title="Направление"
        onClick={() => toggleOpenSubject(!isOpenSubject)}
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
          isOpen={isOpen}
          onClick={() => toggleOpen(!isOpen)}
          title="Основная информация"
        >
          <div className={cls.content}>
            <div className={cls.content_input}>
              <Input
                value={name}
                placeholder="Название предмета"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>

            <div className={cls.content_color}>
              <div className={cls.content_color_title}>Цвет предмета</div>
              <div className={cls.content_color_input}>
                <InputColor
                  value={color}
                  onChange={(e) => setColor(e.currentTarget.value)}
                />
                <div className={cls.input_color_value_container}>
                  <Input value={color} onChange={() => null} />
                </div>
              </div>
            </div>
          </div>
        </SectionCollapse>
      </div>
    </div>
  );
};
