import React from 'react';

import { AddButton } from '@/components/common/AddButton/AddButton';
import { LevelType } from '@/types/common';

import { OptionsList } from './OptionsList';

type Props = {
  levels: LevelType[];
};

export const Options: React.FC<Props> = ({ levels }) => {
  return (
    <div>
      <OptionsList levels={levels} />
      <AddButton text="Добавить опцию" onClick={() => null} />
    </div>
  );
};
