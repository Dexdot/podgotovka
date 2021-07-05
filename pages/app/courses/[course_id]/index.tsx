import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { CourseEdit } from '@/components/App/CourseEdit/CourseEdit';
import { CourseEditContext, CourseEditStore } from '@/store/app/course-edit';

const CourseEditPage: React.FC = () => {
  const router = useRouter();
  const courseID = router.query.course_id as string;
  const [store, setStore] = useState<CourseEditStore>();

  useEffect(() => {
    if (courseID) {
      setStore(new CourseEditStore());
    }
  }, [courseID]);

  return store && courseID ? (
    <CourseEditContext.Provider value={store}>
      <CourseEdit courseID={Number(courseID)} />
    </CourseEditContext.Provider>
  ) : null;
};

export default CourseEditPage;
