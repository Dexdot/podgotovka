import React from 'react';
import cls from './SubjectList.module.scss';
import { SubjectListItem } from './SubjectListItem.tsx/SubjectListItem';

const items = [
  { id: 1, name: 'Русский язык', direction: 'ЕГЭ', color: 'red' },
  { id: 1, name: 'Математика', direction: 'ОГЭ', color: 'orange' },
  { id: 1, name: 'Русский язык', direction: 'ОГЭ', color: 'red' }
];

export const SubjectList: React.FC = () => {
  return (
    <div className={cls.subject_list}>
      {items.map((el) => {
        const { id, name, direction, color } = el;
        return <SubjectListItem subject={{ id, name, direction, color }} />;
      })}
      {/* <SubjectListItem title="Русский язык" subtitle="ЕГЭ" />
      <SubjectListItem title="Русский язык" subtitle="ЕГЭ" />
      <SubjectListItem title="Русский язык" subtitle="ЕГЭ" /> */}
    </div>
  );
};
