import React from 'react';

import { NextIcon } from '../Icons';

import cls from './Material.module.scss';

interface PropsI {
  nextMaterial: string;
  onNextClick: () => void;
}

export const Footer: React.FC<PropsI> = ({ nextMaterial, onNextClick }) => {
  return (
    <button className={cls.footer} type="button" onClick={onNextClick}>
      <div className={cls.footer_left}>
        <p>Следующая статья</p>
        <h3>{nextMaterial}</h3>
      </div>
      <NextIcon />
    </button>
  );
};
