// /* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { SubjectHeader } from '@/components/App/Subjects/SubjectHeader/SubjectHeader';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { updateSubject } from '@/api/subjects';

import { useSubject } from '@/api/hooks/subjects/useSubject';
import { showAlert } from '@/utils/network';
import cls from './SubjectUpdate.module.scss';
import { SubjectEdit } from '../SubjectEdit/SubjectEdit';

type Props = {
  subjectID: number;
};

export const SubjectUpdate: React.FC<Props> = ({ subjectID }) => {
  const subject = useSubject(subjectID);
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [isOpen, toggleOpen] = useState<boolean>(true);

  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setColor(subject.color);
    }
  }, [subject]);

  const update = async () => {
    const item = {
      id: subjectID,
      name,
      color
    };

    try {
      const { data } = await updateSubject(item);
      setName(data.name);
      setColor(data.color);
      router.push('/app/subjects');
    } catch (error) {
      showAlert({ error });
    }
  };

  return (
    <div className={cls.subject_update}>
      <div className={cls.subject_update_header}>
        <SubjectHeader
          title="Изменение предмета"
          buttonText="Сохранить"
          onClick={update}
          disabled={false}
        />
      </div>

      <SectionCollapse
        isOpen={isOpen}
        onClick={() => toggleOpen(!isOpen)}
        title="Основная информация"
      >
        <SubjectEdit
          placeholderNameSubject="Название предмета"
          nameColor={color}
          nameSubject={name}
          setColor={setColor}
          setName={setName}
        />
      </SectionCollapse>
    </div>
  );
};
