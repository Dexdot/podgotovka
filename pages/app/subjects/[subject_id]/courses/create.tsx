import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { CourseEdit } from '@/components/CourseEdit/CourseEdit';
import { CourseEditContext, CourseEditStore } from '@/store/course-edit';

const AppCoursesCreate: React.FC = () => {
  const router = useRouter();
  const subjectID = router.query.subject_id as string;
  const [store] = useState<CourseEditStore>(new CourseEditStore());

  return (
    <CourseEditContext.Provider value={store}>
      {subjectID && <CourseEdit subjectID={Number(subjectID)} isCreate />}
    </CourseEditContext.Provider>
  );
};

export default AppCoursesCreate;
