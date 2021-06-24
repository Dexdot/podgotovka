import React from 'react';

import { AddButton } from '@/components/common/AddButton/AddButton';
import { OptionsList } from './OptionsList';

export const Options: React.FC = () => {
  return (
    <div>
      <OptionsList />
      {/* TODO: Add options modal */}
      <AddButton text="Добавить опцию" onClick={() => null} />
    </div>
  );
};
