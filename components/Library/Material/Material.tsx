import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { MaterialI } from '@/types/library';

import { LibraryContext } from '@/store/library';

import { Editor } from './Editor';
import { Footer } from './Footer';
import { Header } from './Header';

import cls from './Material.module.scss';

export const Material: React.FC = observer(() => {
  const router = useRouter();
  const { pathname } = router;
  const { subject_id, material_id } = router.query;

  const materialId = useMemo<number | null>(
    () => (material_id ? Number(material_id) : null),
    [material_id]
  );

  const subjectId = useMemo<number>(() => Number(subject_id), [subject_id]);

  const editMode = useMemo<boolean>(
    () => pathname.includes('create') || pathname.includes('edit'),
    [pathname]
  );

  const { categories, fetchMaterial } = useContext(LibraryContext);

  const [materialText, setMaterialText] = useState<any>();

  useEffect(() => {
    if (materialId) {
      fetchMaterial(materialId);
    }
  }, [fetchMaterial, materialId]);

  const allMaterials = useMemo<MaterialI[]>(
    () =>
      categories
        .map(({ materials }) => materials)
        .reduce((acc, val) => [...acc, ...val], []),
    [categories]
  );

  const nextMaterial = useMemo<MaterialI | null>(() => {
    const indexOfCurrentMaterial = allMaterials.findIndex(
      (item) => item.id === materialId
    );
    if (indexOfCurrentMaterial === allMaterials.length - 1) {
      return null;
    }
    return allMaterials[indexOfCurrentMaterial + 1];
  }, [allMaterials, materialId]);

  return (
    <div className={cn(cls.root, { [cls.root_edit]: editMode })}>
      {!materialId && (
        <div className={cls.material_new}>
          Выберите материал в меню слева, чтобы начать работу
        </div>
      )}
      {materialId && (
        <>
          <Header
            nextMaterial={nextMaterial}
            editMode={editMode}
            subjectId={subjectId}
            materialText={materialText}
          />
          <Editor editMode={editMode} onChange={setMaterialText} />
          {nextMaterial && !editMode && (
            <Footer nextMaterial={nextMaterial} subjectId={subjectId} />
          )}
        </>
      )}
    </div>
  );
});
