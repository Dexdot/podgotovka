import React from 'react';
import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';

import cls from './SubjectEdit.module.scss';

type Props = {
  placeholderNameSubject: string;
  nameSubject: string;
  nameColor: string;
  setName: (str: string) => void;
  setColor: (str: string) => void;
};

export const SubjectEdit: React.FC<Props> = ({
  placeholderNameSubject,
  nameColor,
  nameSubject,
  setColor,
  setName
}) => {
  return (
    <div className={cls.content}>
      <div className={cls.content_input}>
        <Input
          value={nameSubject}
          placeholder={placeholderNameSubject}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>

      <div className={cls.content_color}>
        <div className={cls.content_color_title}>Цвет предмета</div>
        <div className={cls.content_color_input}>
          <InputColor
            value={nameColor}
            onChange={(e) => setColor(e.currentTarget.value)}
          />
          <div className={cls.input_color_value_container}>
            <Input value={nameColor} onChange={() => null} />
          </div>
        </div>
      </div>
    </div>
  );
};
