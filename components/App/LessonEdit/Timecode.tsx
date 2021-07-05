import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { TextareaFlat } from '@/components/common/Textarea/TextareaFlat';
import { LessonEditContext } from '@/store/app/lesson-edit';

export const Timecode: React.FC = observer(() => {
  const { timecode, setTimecode } = useContext(LessonEditContext);

  return (
    <div>
      <TextareaFlat
        value={timecode}
        onChange={(e) => setTimecode(e.currentTarget.value)}
        placeholder="Скопируйте с ютуба таймкоды из описания и добавьте их сюда"
      />
    </div>
  );
});
