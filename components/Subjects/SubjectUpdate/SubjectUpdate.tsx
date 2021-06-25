// /* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useContext, useEffect } from 'react';

import { Input } from '@/components/common/Input/Input';
import { InputColor } from '@/components/common/Input/InputColor';
import { SubjectHeader } from '@/components/Subjects/SubjectHeader/SubjectHeader';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { SubjectContext, subjectsStore } from '@/store/subjects';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import cls from './SubjectUpdate.module.scss';

export const SubjectUpdate: React.FC = observer(() => {
  const subjectStore = useContext(SubjectContext);
  const elem = subjectStore.subjectItem;
  const [name, setName] = useState<string>(elem ? elem!.name : '');
  const [color, setColor] = useState<string>(elem ? elem!.color : '');
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    subjectsStore.getSubjectDetail(Number(router.query.subject_id));
  }, [router.query.subject_id]);

  const setUpdate = () => {
    const item = {
      id: Number(router.query.subject_id),
      name,
      color
    };
    subjectStore.updateSubject({ ...item! });
  };

  return (
    <div className={cls.subject_update}>
      <div className={cls.subject_update_header}>
        <SubjectHeader
          title="Изменение предмета"
          buttonText="Сохранить"
          onClick={setUpdate}
          disabled={false}
        />
      </div>

      <SectionCollapse
        isOpen={isOpen}
        onClick={() => toggleOpen(!isOpen)}
        title="Основная информация"
      >
        <div className={cls.content}>
          <div className={cls.content_input}>
            <Input
              value={name && name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Название предмета"
            />
          </div>

          <div className={cls.content_color}>
            <div className={cls.content_color_title}>Цвет предмета</div>
            <div className={cls.content_color_input}>
              <InputColor
                value={color && color}
                onChange={(e) => setColor(e.currentTarget.value)}
              />
              <div className={cls.input_color_value_container}>
                <Input value={color} onChange={() => null} />
              </div>
            </div>
          </div>
        </div>
      </SectionCollapse>
    </div>
  );
});
