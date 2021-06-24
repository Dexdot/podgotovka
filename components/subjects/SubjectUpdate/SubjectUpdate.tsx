/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';

import { SubjectHeader } from '@/components/Subjects/SubjectHeader/SubjectHeader';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';
import cls from './SubjectUpdate.module.scss';

export const SubjectUpdate: React.FC = () => {
  const [color, setColor] = useState<string>('');
  const [isOpen, toggleOpen] = useState<boolean>(false);
  return (
    <div className={cls.subject_update}>
      <SubjectHeader
        title="Изменение предмета"
        buttonText="Сохранить"
        onClick={() => console.log('update')}
        isDisable
      />

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
  );
};
