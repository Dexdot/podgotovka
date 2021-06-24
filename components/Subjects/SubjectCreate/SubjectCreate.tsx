/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';

import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import { SubjectContext } from '@/store/subjects';
import { SubjectHeader } from '../SubjectHeader/SubjectHeader';

import cls from './SubjectCreate.module.scss';
import { SubjectIcon } from './Icons';

export const SubjectCreate: React.FC = () => {
  const [color, setColor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [isOpenSubject, toggleOpenSubject] = useState<boolean>(false);
  const subjectStore = useContext(SubjectContext);

  return (
    <div className={cls.subject_create}>
      <div className={cls.subject_create_header}>
        <SubjectHeader
          title="Создание предмета"
          buttonText="Сохранить"
          onClick={() => console.log('Create')}
          disabled
        />
      </div>

      <SectionCollapse
        isOpen={false}
        title="Направление"
        headerChildren={
          <div className={cls.selected_value}>
            <SubjectIcon />
            ЕГЭ
          </div>
        }
      />

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
