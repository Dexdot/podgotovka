import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LessonEditContext, LessonEditStore } from '@/store/lesson-edit';
import { LessonEdit } from '@/components/LessonEdit/LessonEdit';

const CreateLessonPage: React.FC = () => {
  const router = useRouter();
  const courseID = router.query.course_id as string;
  const [store] = useState(new LessonEditStore());

  useEffect(() => {
    if (courseID) {
      store.setCourseID(Number(courseID));
    }
  }, [courseID]);

  return (
    <LessonEditContext.Provider value={store}>
      {courseID && <LessonEdit isCreate />}
    </LessonEditContext.Provider>
  );
};

export default CreateLessonPage;
