import React from 'react';
import { useRouter } from 'next/router';

import { CoursesPage } from '@/components/CoursesPage/CoursesPage';

const AppCoursesPage: React.FC = () => {
  const router = useRouter();
  const subjectID = router.query.subject_id as string;

  return subjectID ? <CoursesPage subjectID={Number(subjectID)} /> : null;
};

export default AppCoursesPage;
