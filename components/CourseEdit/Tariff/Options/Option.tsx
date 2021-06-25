/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from '@/components/common/Input/Input';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';

import { OptionI } from '@/types/common';
import { CourseEditContext } from '@/store/course-edit';
import { numberWithSpaces, onlyNumbers } from '@/utils/format';

import cls from './Options.module.scss';
import { DragIcon, RemoveIcon } from './icons';

type Props = {
  option: OptionI;
  dragHandleProps: any;
};

export const Option: React.FC<Props> = observer(
  ({ option, dragHandleProps }) => {
    const { values, setOptionValue } = useContext(CourseEditContext);
    const optionID = option.id;
    const optionValues = values.filter((v) => v.option_id === optionID);

    return (
      <div className={cls.option}>
        <div className={cls.drag} {...dragHandleProps} tabIndex={-1}>
          <DragIcon />
        </div>

        <button className={cls.remove} type="button">
          <RemoveIcon />
        </button>

        <p>{option.name}</p>

        <ul className={cls.values}>
          {optionValues.map((v) => {
            const levelID = v.level_id;

            return (
              <li key={levelID}>
                {option.type === 'string' && (
                  <Input
                    value={v.value as string}
                    onChange={(e) => setOptionValue(e.currentTarget.value, v)}
                  />
                )}

                {option.type === 'numeric' && (
                  <Input
                    value={String(v.value as number)}
                    onChange={(e) =>
                      setOptionValue(
                        numberWithSpaces(
                          Number(onlyNumbers(e.currentTarget.value))
                        ),
                        v
                      )
                    }
                  />
                )}

                {option.type === 'boolean' && (
                  <Checkbox
                    id={`${option.id}${levelID}`}
                    checked={v.value as boolean}
                    onChange={(e) => setOptionValue(e.currentTarget.checked, v)}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);