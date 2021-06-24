/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';
import { Collapse } from 'react-collapse';
import { ChevronIcon } from '@/components/common/SectionCollapse/icons';
import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';

import { SubjectHeader } from '@/components/subjects/SubjectHeader/SubjectHeader';
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
      <div className={cls.subject_update_section}>
        <section className={cn(cls.root, { [cls.root_open]: isOpen })}>
          <button
            className={cls.toggle_btn}
            type="button"
            onClick={() => toggleOpen(!isOpen)}
          />
          <b className={cls.title}>
            Основная информация
            <ChevronIcon />
          </b>

          <Collapse isOpened={isOpen}>
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
          </Collapse>
        </section>
      </div>
    </div>
  );
};
