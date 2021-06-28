import React, { useMemo } from 'react';
import { FormikProps } from 'formik';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import { roles, statuses } from '../helpers';
import { FormI } from './helpers';

import cls from './EditUser.module.scss';

interface PropsI {
  form: FormikProps<FormI>;
}

export const RolesAndSubjects: React.FC<PropsI> = ({ form }) => {
  const subjects = useSubjects();

  const subjectOptions = useMemo<DropdownItem[]>(() => {
    if (subjects) {
      return subjects.map((item) => ({
        id: item.id.toString(),
        text: item.name
      }));
    }
    return [];
  }, [subjects]);

  const selectedRole = useMemo<DropdownItem | null>(
    () => roles.find((item) => item.id === form.values.role) || null,
    [form.values.role]
  );
  const selectedSubject = useMemo<DropdownItem | null>(
    () =>
      subjectOptions?.find(
        (item) => item.id === form.values.subject_id.toString()
      ) || null,
    [form.values.subject_id, subjectOptions]
  );
  const selectedStatus = useMemo<DropdownItem | null>(
    () =>
      statuses.find((item) => item.id === form.values.is_active.toString()) ||
      null,
    [form.values.is_active]
  );

  return (
    <div className={cls.form}>
      <div className={cls.dropdown}>
        <p>Роль</p>
        <Dropdown
          items={roles}
          value={selectedRole}
          onChange={(value) => form.setFieldValue('role', value.id)}
          disabled
          placeholder="Роль"
        />
      </div>
      <div className={cls.dropdown}>
        <p>Предмет</p>
        <Dropdown
          items={subjectOptions}
          value={selectedSubject}
          onChange={(value) =>
            form.setFieldValue('subject_id', JSON.parse(value.id))
          }
          placeholder="Предмет"
        />
      </div>
      <div className={cls.dropdown}>
        <p>Статус</p>
        <Dropdown
          items={statuses}
          value={selectedStatus}
          onChange={(value) =>
            form.setFieldValue('is_active', JSON.parse(value.id))
          }
          placeholder="Статус"
        />
      </div>
    </div>
  );
};