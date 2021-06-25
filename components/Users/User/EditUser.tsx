import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';

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

  const { updateUser, fetchUserDetails, userDetails } =
    useContext(UsersContext);

  const [file, setFile] = useState<Blob | null>(null);

  const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
    try {
      let photo_link;
      if (file) {
        // await upload photo
      }
      updateUser({ ...form, id: Number(id), photo_link });
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

  useEffect(() => {
    if (id) {
      fetchUserDetails(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (userDetails.id) {
      const { subject, ...details } = userDetails;
      form.setValues({
        ...details,
        subject_id: subject.id
      });
    }
  }, [userDetails.id]);

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

      <form id="role-form" onSubmit={form.handleSubmit}>
        <SectionCollapse
          isOpen={false}
          title="Роль"
          headerChildren={<RoleInCollapseHeader role={form.values.role} />}
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
