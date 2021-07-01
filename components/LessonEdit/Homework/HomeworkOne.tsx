import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { HWEditContext } from '@/store/homework-edit';

export const HomeworkOne: React.FC = observer(() => {
  const store = useContext(HWEditContext);
  return <div>HomeworkOne</div>;
});
