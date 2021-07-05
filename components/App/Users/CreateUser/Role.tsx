import React from 'react';
import { FormikProps } from 'formik';

import { Checkbox } from '@/components/common/Checkbox/Checkbox';

import { RoleType } from '@/types/app/users';
import { FormI } from './helpers';

import { roles } from '../helpers';
import cls from './CreateUser.module.scss';

interface PropsI {
  onCheckRole: (role: RoleType) => void;
  form: FormikProps<FormI>;
}

export const Role: React.FC<PropsI> = ({ onCheckRole, form }) => {
  return (
    <>
      <h3>Выберите роль пользователя</h3>

      {roles.map((item) => (
        <div key={item.id} className={cls.checkbox}>
          <Checkbox
            id={`role_${item.id}`}
            onChange={() => onCheckRole(item.id as RoleType)}
            checked={form.values.role === item.id}
          />
          <label htmlFor={`role_${item.id}`}>{item.text}</label>
        </div>
      ))}
      {form.touched.role && form.errors.role && (
        <p className={cls.error}>{form.errors.role}</p>
      )}
    </>
  );
};
