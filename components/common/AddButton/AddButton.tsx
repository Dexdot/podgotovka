import React from 'react';
import cls from './AddButton.module.scss';
import { AddIcon } from './icons';

type Props = {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
};

export const AddButton: React.FC<Props> = ({ text, onClick, disabled }) => {
  return (
    <button
      className={cls.root}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <AddIcon /> {text}
    </button>
  );
};

AddButton.defaultProps = {
  text: 'Добавить'
};
