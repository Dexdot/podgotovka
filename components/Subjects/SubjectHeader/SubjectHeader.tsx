/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Button } from '@/components/common/Button/Button';
import cls from './SubjectHeader.module.scss';

type Props = {
  buttonText: string;
  title: string;
  onClick: () => void;
  disabled: boolean;
};

export const SubjectHeader: React.FC<Props> = ({
  buttonText,
  title,
  onClick,
  disabled
}) => {
  return (
    <header className={cls.header}>
      <h1 className={cls.title}>{title}</h1>

      <div className={cls.action}>
        <Button onClick={onClick} disabled={disabled}>
          {buttonText}
        </Button>
      </div>
    </header>
  );
};
