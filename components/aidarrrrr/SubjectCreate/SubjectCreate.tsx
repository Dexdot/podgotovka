/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { SubjectHeader } from '../SubjectHeader/SubjectHeader';

import cls from './SubjectCreate.module.scss';
import { SubjectIcon } from './Icons';

export const SubjectCreate: React.FC = () => {
  const [color, setColor] = useState<string>('');
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [isOpenSubject, toggleOpenSubject] = useState<boolean>(false);

  return (
    <div className={cls.subject_create}>
      <div className={cls.subject_create_header}>
        <SubjectHeader
          title="Создание предмета"
          buttonText="Сохранить"
          onClick={() => console.log('Create')}
          isDisable
        />
      </div>

      <SectionCollapse
        isOpen={isOpenSubject}
        onClick={() => toggleOpenSubject(!isOpenSubject)}
        title="Направление"
        headerChildren={
          <div className={cls.selected_value}>
            <SubjectIcon />
            Русский язык
          </div>
        }
      >
        Collapse content
      </SectionCollapse>
      <div className={cls.subject_create_section}>
        <SectionCollapse
          isOpen={isOpen}
          onClick={() => toggleOpen(!isOpen)}
          title="Основная информация"
        >
          <div className={cls.content}>
            <div className={cls.content_input}>
              <Input value="" placeholder="Название предмета" />
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
