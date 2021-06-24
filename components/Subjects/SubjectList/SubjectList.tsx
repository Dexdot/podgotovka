import { SubjectI } from '@/types/subjects';
import React from 'react';
import cls from './SubjectList.module.scss';
import { SubjectListItem } from './SubjectListItem/SubjectListItem';

type Props = {
  items: SubjectI[];
};

export const SubjectList: React.FC<Props> = ({ items }) => {
  return (
    <ul className={cls.list}>
      {items.map((el) => (
        <li key={el.id}>
          <SubjectListItem subject={el} />
        </li>
      ))}
    </ul>
  );
};
