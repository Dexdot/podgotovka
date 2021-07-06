import React, { useContext } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';

import { AuthContext } from '@/store/auth';
import type { AuthI } from '@/types/auth';
import { showAlert } from '@/utils/network';

import cls from '@/components/Auth/Auth.module.scss';
import { FormI, initialValues, validate } from './helpers';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

type Props = {
  onSubmit: (form: FormI) => Promise<AxiosResponse<AuthI>>;
};

export const SigninForm: React.FC<Props> = observer(({ onSubmit }) => {
  const router = useRouter();
  const authStore = useContext(AuthContext);

  const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
    try {
      const { data } = await onSubmit(form);
      authStore.setAuth(data);

      helpers.setSubmitting(false);
      helpers.resetForm();

      router.push('/');
    } catch (error) {
      showAlert({ error });
      helpers.setSubmitting(false);
    }
  };

  const form = useFormik<FormI>({
    initialValues,
    validate: (values) => validate(values),
    onSubmit: (values, helpers) => {
      submit(values, helpers);
    }
  });

  return (
    <form className={cls.form} onSubmit={form.handleSubmit}>
      <h2 className={cls.title}>Авторизация</h2>
      <Input
        type="text"
        name="username"
        placeholder="Логин"
        value={form.values.username}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        errorText={form.touched.username ? form.errors.username : ''}
      />
      <div className={cls.margin} />
      <Input
        type="password"
        name="password"
        placeholder="Пароль"
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        errorText={form.touched.password ? form.errors.password : ''}
      />
      <div className={cls.margin} />
      <Button
        fullWidth
        type="submit"
        loading={form.isSubmitting}
        disabled={form.isSubmitting || !form.isValid}
      >
        Войти
      </Button>
      <div className={cls.margin} />
      <ButtonLink fullWidth href="/signup" variant="grey">
        Зарегистрироваться
      </ButtonLink>
    </form>
  );
});
