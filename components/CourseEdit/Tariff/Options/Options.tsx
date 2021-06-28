import React, { useContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { SelectOptions } from '@/components/common/SelectOptions/SelectOptions';
import { AddButton } from '@/components/common/AddButton/AddButton';

import { CourseEditContext } from '@/store/course-edit';
import { useOptions } from '@/api/hooks/options/useOptions';

import cls from './Options.module.scss';
import { OptionsList } from './OptionsList';

export const Options: React.FC = observer(() => {
  const { options, addOption } = useContext(CourseEditContext);
  const [allOptions] = useOptions();
  const [isSelectOpen, setSelectOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    const selectedOptionsIDs = options.map((o) => o.id);
    return allOptions.filter((o) => !selectedOptionsIDs.includes(o.id));
  }, [options, allOptions]);

  return (
    <div>
      <OptionsList />

      <div className={cls.select_wrap}>
        <AddButton text="Добавить опцию" onClick={() => setSelectOpen(true)} />
        <div className={cn(cls.select, { [cls.select_open]: isSelectOpen })}>
          <SelectOptions
            options={filteredOptions}
            onClick={(o) => {
              addOption(o);
              setSelectOpen(false);
            }}
            onOutsideClick={() => setSelectOpen(false)}
            outsideClass={cls.select_wrap}
          />
        </div>
      </div>
    </div>
  );
});
