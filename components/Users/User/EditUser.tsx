import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';

import { UsersAPI } from '@/api/users';

import { UsersContext } from '@/store/users';

import { showAlert } from '@/utils/network';

import { Button } from '@/components/common/Button/Button';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { Main } from './Main';
import { RoleInCollapseHeader } from './RoleInCollapseHeader';
import { FormI, initialValues, validate } from './helpers';

import cls from './User.module.scss';

export const EditUser: React.FC = observer(() => {
  const router = useRouter();
  const { id } = router.query;

  // @ts-ignore
  const { updateUser } = useContext(UsersContext);

  const [file, setFile] = useState<File | null>(null);

  const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
    try {
      if (file) {
        // await upload photo
      }
      updateUser({ ...form, id: Number(id) });
      router.push('/app/users');
    } catch (error) {
      showAlert({ error });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const form = useFormik<FormI>({
    initialValues,
    validate: (values) => validate(values, false),
    onSubmit: (values, helpers) => {
      submit(values, helpers);
    }
  });

  const fetchUserDetails = async (userId: number) => {
    try {
      form.setSubmitting(true);
      const formData = await UsersAPI.fetchUserDetails(userId);
      form.setValues({ ...formData.data });
    } catch (error) {
      showAlert({ error });
    } finally {
      form.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails(Number(id));
    }
  }, [id]);

  return (
    <section className={cls.root}>
      <div className={cls.header}>
        <h1>Редактирование пользователя</h1>
        <Button
          type="submit"
          form="role-form"
          loading={form.isSubmitting}
          disabled={!form.isValid || form.isSubmitting}
        >
          Сохранить
        </Button>
      </div>

      <form id="role-form">
        <SectionCollapse
          isOpen={false}
          title="Роль"
          headerChildren={<RoleInCollapseHeader roleId={form.values.roleId} />}
        />

        <SectionCollapse isOpen title="Основная информация">
          <Main
            form={form}
            onFileLoad={setFile}
            photo={form.values.photo_link || ''}
          />
        </SectionCollapse>
      </form>
    </section>
  );
});
