import React from 'react';
import cls from './AddButton.module.scss';
import { AddIcon } from './icons';

type Props = {
  onClick: () => void;
  text?: string;
};

export const AddButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button className={cls.root} type="button" onClick={onClick}>
      <AddIcon /> {text}
    </button>
  );
};

AddButton.defaultProps = {
  text: 'Добавить'
};
