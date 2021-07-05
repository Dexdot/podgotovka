import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LessonEdit } from '@/components/App/LessonEdit/LessonEdit';

import { LessonEditContext, LessonEditStore } from '@/store/app/lesson-edit';

const EditLessonPage: React.FC = () => {
  const router = useRouter();
  const lessonID = router.query.lesson_id as string;
  const [store, setStore] = useState<LessonEditStore>();

  useEffect(() => {
    if (lessonID) {
      setStore(new LessonEditStore());
    }
  }, [lessonID]);

  return lessonID && store ? (
    <LessonEditContext.Provider value={store}>
      {lessonID && <LessonEdit lessonID={Number(lessonID)} />}
    </LessonEditContext.Provider>
  ) : null;
};

export default EditLessonPage;
