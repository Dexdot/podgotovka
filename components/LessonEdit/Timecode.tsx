import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { LessonEditContext } from '@/store/lesson-edit';

export const Timecode: React.FC = observer(() => {
  const { timecode, setTimecode } = useContext(LessonEditContext);
  return <div>Скопируйте с ютуба таймкоды из описания и добавьте их сюда</div>;
});
