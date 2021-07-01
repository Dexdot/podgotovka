import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { BackLink } from '@/components/common/BackLink/BackLink';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { Categories } from '../Categories/Categories';
import { Material } from '../Material/Material';

import cls from './EditMaterialPage.module.scss';

export const EditMaterialPage: React.FC = () => {
  const router = useRouter();
  const { material_id, subject_id } = router.query;
  const { pathname } = router;

  const subjects = useSubjects();

  const isNew = useMemo<boolean>(() => pathname.includes('create'), [pathname]);

  useEffect(() => {
    if (subjects && !subject_id) {
      router.push(`/library/subject/${subjects[0].id}`);
    }
  }, [subjects, subject_id, router]);

  return (
    <div className={cls.root}>
      <BackLink
        text="Вернуться к читальне"
        href={
          isNew
            ? `/library/subject/${subject_id}`
            : `/library/subject/${subject_id}/material/${material_id}`
        }
      />

      <SectionCollapse title="Управление читальней" isOpen>
        <div className={cls.content}>
          <Categories
            materialId={isNew ? null : Number(material_id)}
            subjects={subjects}
            subjectId={Number(subject_id)}
            editMode
          />
          <Material
            materialId={isNew ? null : Number(material_id)}
            subjectId={Number(subject_id)}
            editMode
          />
        </div>
      </SectionCollapse>
    </div>
  );
};
