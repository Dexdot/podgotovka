/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from 'react';

import { Input } from '@/components/common/Input/Input';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { LevelType, OptionI, OptionValueType } from '@/types/common';
import { numberWithSpaces, onlyNumbers } from '@/utils/format';

import cls from './Options.module.scss';
import { DragIcon, RemoveIcon } from './icons';
import { ValueType, getInitialValues } from './helpers';

type Props = {
  option: OptionI;
  levels: LevelType[];
  dragHandleProps: any;
};

export const Option: React.FC<Props> = ({
  levels,
  option,
  dragHandleProps
}) => {
  const [values, setValues] = useState<ValueType[]>(
    getInitialValues(option, levels)
  );

  useEffect(() => {
    setValues(getInitialValues(option, levels));
  }, [option, levels]);

  const handleChange = (inputValue: OptionValueType, level_id: number) => {
    const value = values.find((v) => v.level_id === level_id);

    if (value) {
      const updatedValue = { ...value, value: inputValue };
      setValues((vs) => {
        return vs.map((v) => {
          if (v.level_id === level_id) {
            return updatedValue;
          }
          return v;
        });
      });
    }
  };

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
        {values.map((v) => (
          <li key={v.level_id}>
            {option.type === 'string' && (
              <Input
                value={v.value as string}
                onChange={(e) =>
                  handleChange(e.currentTarget.value, v.level_id)
                }
              />
            )}

            {option.type === 'numeric' && (
              <Input
                value={String(v.value as number)}
                onChange={(e) =>
                  handleChange(
                    numberWithSpaces(
                      Number(onlyNumbers(e.currentTarget.value))
                    ),
                    v.level_id
                  )
                }
              />
            )}

            {option.type === 'boolean' && (
              <Checkbox
                id={`${option.id}${v.level_id}`}
                checked={v.value as boolean}
                onChange={(e) =>
                  handleChange(e.currentTarget.checked, v.level_id)
                }
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
