import React from 'react';
import cls from './Baige.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Baige: React.FC<Props> = ({ children }) => {
  return <div className={cls.root}>{children}</div>;
};
