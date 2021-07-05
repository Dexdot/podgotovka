import React from 'react';
import { FormikProps } from 'formik';

import { copyToClipboard } from '@/utils/copyToClipboard';

import { Input } from '@/components/common/Input/Input';

import { CopyIcon, RefreshIcon } from '../Icons';
import { FormI } from './helpers';

import cls from './EditUser.module.scss';

interface PropsI {
  form: FormikProps<FormI>;
  onRefresh: () => void;
  refreshBtnDisabled: boolean;
}

export const Password: React.FC<PropsI> = ({
  form,
  onRefresh,
  refreshBtnDisabled
}) => {
  return (
    <div className={cls.form}>
      <h3>
        Пароль для пользователя система генерирует автоматически.
        <br />
        Скопируйте и передайте логин и пароль нужному пользователю.
      </h3>

      <p className={cls.pass_label}>Текущий пароль</p>
      <div className={cls.pass}>
        <Input
          name="password"
          placeholder="Пароль*"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorText={form.touched.password ? form.errors.password : ''}
          disabled
        />
        <button
          onClick={() => copyToClipboard(form.values.password)}
          type="button"
          className={cls.pass_btn}
        >
          <CopyIcon />
          <p>Скопировать пароль</p>
        </button>
      </div>
      <button
        onClick={onRefresh}
        disabled={refreshBtnDisabled}
        type="button"
        className={cls.pass_btn}
      >
        <RefreshIcon />
        <p>Создать новый пароль</p>
      </button>
    </div>
  );
};
