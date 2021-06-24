import React from 'react';
import { FormikProps } from 'formik';

import { Checkbox } from '@/components/common/Checkbox/Checkbox';

import { useRoles } from '@/api/hooks/useRoles';

import { FormI } from './helpers';

import cls from './User.module.scss';

interface PropsI {
  onCheckRole: (roleId: string) => void;
  form: FormikProps<FormI>;
}

export const Role: React.FC<PropsI> = ({ onCheckRole, form }) => {
  const [roles] = useRoles();

  return (
    <>
      <h3>Выберите роль пользователя</h3>

      {roles.map((item) => (
        <div key={item.id} className={cls.checkbox}>
          <Checkbox
            id={`role_${item.id}`}
            onChange={() => onCheckRole(item.id)}
            checked={form.values.roleId === item.id}
          />
          <label htmlFor={`role_${item.id}`}>{item.text}</label>
        </div>
      ))}
      {form.touched.roleId && form.errors.roleId && (
        <p className={cls.error}>{form.errors.roleId}</p>
      )}
    </>
  );
};
