import React from 'react';
import cls from './SubjectList.module.scss';
import { SubjectListItem } from './SubjectListItem/SubjectListItem';

const items = [
  { id: 1, name: 'Русский язык', direction: 'ЕГЭ', color: 'red' },
  { id: 1, name: 'Математика', direction: 'ОГЭ', color: 'orange' },
  { id: 1, name: 'Русский язык', direction: 'ОГЭ', color: 'red' }
];

export const SubjectList: React.FC = () => {
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
