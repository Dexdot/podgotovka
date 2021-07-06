import React, { useContext } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

import { AuthContext } from '@/store/auth';
import type { AuthI } from '@/types/auth';
import { showAlert } from '@/utils/network';

import cls from '@/components/Auth/Auth.module.scss';
import { FormI, initialValues, validate } from './helpers';

type Props = {
  onSubmit: (form: FormI) => Promise<AxiosResponse<AuthI>>;
};

export const SignupForm: React.FC<Props> = observer(({ onSubmit }) => {
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
      <h2 className={cls.title}>Регистрация</h2>
      <Input
        type="text"
        name="name"
        placeholder="Как вас зовут?"
        value={form.values.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        errorText={form.touched.name ? form.errors.name : ''}
      />
      <div className={cls.margin} />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        errorText={form.touched.email ? form.errors.email : ''}
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
        Зарегистрироваться
      </Button>
      <div className={cls.margin} />
      <ButtonLink fullWidth href="/signin" variant="grey">
        У меня уже есть аккаунт
      </ButtonLink>
    </form>
  );
});
