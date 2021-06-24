import { SubjectI } from '@/types/subjects';
import React from 'react';
import cls from './SubjectList.module.scss';
import { SubjectListItem } from './SubjectListItem.tsx/SubjectListItem';

type Props = {
  items: SubjectI[];
};

export const SubjectList: React.FC<Props> = ({ items }) => {
  return (
    <div className={cls.subject_list}>
      {items.map((el) => {
        return <SubjectListItem subject={el} />;
      })}
    </div>
  );
};
