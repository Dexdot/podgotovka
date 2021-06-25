import React, { useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { OptionsContext } from '@/store/options';

import { OPTION_FORMATS } from '@/utils/consts';
// import { getDDMMYY } from '@/utils/date';

import { EditIcon } from './Icons';

import cls from './Options.module.scss';

interface PropsI {
  open: (id: number) => void;
}

export const Table: React.FC<PropsI> = observer(({ open }) => {
  const { options } = useContext(OptionsContext);

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
          <div className={cn(cls.flex_center, cls.format_date)}>
            {OPTION_FORMATS.find((item) => item.type === option.type)?.name}
          </div>
          <div className={cn(cls.flex_center, cls.format_date)}>
            {/* {getDDMMYY(new Date(option.timestamp * 1000))} */}
            todo
          </div>
          {!option.is_systemic && (
            <button
              type="button"
              onClick={() => open(option.id)}
              className={cls.option_edit}
            >
              <EditIcon />
            </button>
          )}
        </div>
      ))}
    </div>
  );
});
