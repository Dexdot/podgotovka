import React from 'react';
import cn from 'classnames';

import { OptionI } from '@/types/common';

import { OPTION_TYPES } from '@/utils/consts';
// import { getDDMMYY } from '@/utils/date';

import { EditIcon } from './Icons';

import cls from './Options.module.scss';

interface PropsI {
  open: (option: OptionI) => void;
  options: OptionI[];
}

export const Table: React.FC<PropsI> = ({ open, options }) => {
  return (
    <div className={cls.table}>
      <div className={cn(cls.row, cls.table_header)}>
        <p>Название</p>
        <p>Формат</p>
        <p>Дата создания</p>
        <p />
      </div>
      {options.map((option) => (
        <div key={option.id} className={cls.row}>
          <div className={cls.option_name_desc}>
            <p className={cls.option_name}>{option.name}</p>
            <p className={cls.option_desc}>{option.description}</p>
          </div>
          <div className={cn(cls.flex_center, cls.option_type_date)}>
            {OPTION_TYPES.find((item) => item.type === option.type)?.name}
          </div>
          <div className={cn(cls.flex_center, cls.option_type_date)}>
            {/* {getDDMMYY(new Date(option.timestamp * 1000))} */}
            todo
          </div>
          {!option.is_systemic && (
            <button
              type="button"
              onClick={() => open(option)}
              className={cls.option_edit}
            >
              <EditIcon />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
