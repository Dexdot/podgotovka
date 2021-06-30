import React, { useCallback, useMemo } from 'react';
import { TODO_CATEGORIES } from '../helpers';

import { Editor } from './Editor';
import { Footer } from './Footer';
import { Header } from './Header';

import cls from './Material.module.scss';

interface PropsI {
  materialId: number;
}

export const Material: React.FC<PropsI> = ({ materialId }) => {
  const nextMaterial = useMemo<string | null>(() => {
    return TODO_CATEGORIES[0].materials[0].name;
  }, []);

  const handleNextClick = useCallback(() => {
    console.log('todo');
  }, []);

  return (
    <div className={cls.root}>
      <Header materialId={materialId} />
      <Editor />
      {nextMaterial && (
        <Footer nextMaterial={nextMaterial} onNextClick={handleNextClick} />
      )}
    </div>
  );
};
