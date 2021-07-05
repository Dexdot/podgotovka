import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LessonEdit } from '@/components/App/LessonEdit/LessonEdit';

import { LessonEditContext, LessonEditStore } from '@/store/lesson-edit';
import { LessonType } from '@/types/lessons';
import { LESSON_TYPES } from '@/utils/consts';

const CreateLessonPage: React.FC = () => {
  const router = useRouter();
  const courseID = router.query.course_id as string;
  const lessonType = router.query.type as LessonType;
  const [store] = useState(new LessonEditStore());

  useEffect(() => {
    if (courseID) {
      store.setCourseID(Number(courseID));
    }
  }, [courseID]);

  useEffect(() => {
    if (lessonType && LESSON_TYPES[lessonType]) {
      store.setType(lessonType);
      const q = { ...router.query };
      delete q.type;
      router.replace({ query: { ...q } });
    }
  }, [lessonType]);

  return (
    <LessonEditContext.Provider value={store}>
      {courseID && <LessonEdit isCreate />}
    </LessonEditContext.Provider>
  );
};

export default CreateLessonPage;
