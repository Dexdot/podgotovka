import React from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import cn from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import cls from './DateTimePicker.module.scss';
import { RemoveIcon, CalendarIcon, TimeIcon } from './icons';

registerLocale('ru', ru);
setDefaultLocale('ru');

type Props = {
  date: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  inline?: boolean;
  showTimeInput?: boolean;
  onlyTime?: boolean;
  remove?: boolean;
  dateFormat?: string;
};

export const DateTimePicker: React.FC<Props> = ({
  date,
  onChange,
  onBlur,
  inline,
  showTimeInput,
  onlyTime,
  remove,
  dateFormat
}) => {
  const defaultDateFormat = showTimeInput ? 'd MMMM, p' : 'd MMMM';

  return (
    <div
      className={cn(cls.root, cls.root_icon, {
        [cls.root_with_remove]: remove,
        [cls.root_only_time]: onlyTime
      })}
    >
      {showTimeInput ? <TimeIcon /> : <CalendarIcon />}

      <DatePicker
        selected={date}
        onChange={(d) => {
          if (onChange) {
            onChange(d as Date);
          }
        }}
        dateFormat={dateFormat || defaultDateFormat}
        timeInputLabel="Время:"
        showTimeInput={showTimeInput}
        inline={inline}
        className={cls.field}
        dayClassName={() => cls.day}
        onBlur={onBlur}
      />

      {remove && (
        <button
          className={cls.remove}
          type="button"
          onClick={() => {
            if (onChange) {
              onChange(undefined);
            }
          }}
        >
          <RemoveIcon />
        </button>
      )}
    </div>
  );
};
