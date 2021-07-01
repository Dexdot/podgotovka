import React, { useMemo } from 'react';

import { MaterialI, TODO_CATEGORIES } from '../helpers';

import { Editor } from './Editor';
import { Footer } from './Footer';
import { Header } from './Header';

import cls from './Material.module.scss';

interface PropsI {
  materialId: number;
  editMode?: boolean;
}

export const Material: React.FC<PropsI> = ({
  materialId,
  editMode = false
}) => {
  const allMaterials = useMemo<MaterialI[]>(
    () =>
      TODO_CATEGORIES.map(({ materials }) => materials).reduce(
        (acc, val) => [...acc, ...val],
        []
      ),
    []
  );

  const currentMaterial = useMemo<MaterialI | null>(
    () => allMaterials.find((item) => item.id === materialId) || null,
    [allMaterials, materialId]
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
    <div className={cls.root}>
      <Header materialId={materialId} />
      <Editor material={currentMaterial} editMode={editMode} />
      {nextMaterial && <Footer nextMaterial={nextMaterial} />}
    </div>
  );
};
