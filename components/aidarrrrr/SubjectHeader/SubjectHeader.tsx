/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Button } from '@/components/common/Button/Button';
import cls from './SubjectHeader.module.scss';

type Props = {
  buttonText: string;
  title: string;
  onClick: () => void;
  isDisable: boolean;
};

export const SubjectHeader: React.FC<Props> = ({
  buttonText,
  title,
  onClick,
  isDisable
}) => {
  return (
    <div className={cls.subject_header}>
      <div className={cls.subject_header_title}>{title}</div>
      <div className={cls.subject_header_action}>
        <Button variant="primary" onClick={onClick} disabled={isDisable}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
