import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { AddButton } from '@/components/common/AddButton/AddButton';
import { HWEditContext } from '@/store/homework-edit';

import cls from './Relation.module.scss';

export const Relation: React.FC = observer(() => {
  const store = useContext(HWEditContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={cls.root}>
      <AddButton
        text="Добавить родительскую задачу"
        onClick={() => setOpen(!isOpen)}
      />
    </div>
  );
});
