import React from 'react';
import { useRouter } from 'next/router';

import { SubjectUpdate } from '@/components/Subjects/SubjectUpdate/SubjectUpdate';

const SubjectUpdatePage: React.FC = () => {
  const router = useRouter();
  const subjectID = router.query.subject_id as string;

  return subjectID ? <SubjectUpdate subjectID={Number(subjectID)} /> : null;
};

export default SubjectUpdatePage;
