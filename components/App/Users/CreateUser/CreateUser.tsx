import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

import { UsersContext } from '@/store/app/users';

import { Button } from '@/components/common/Button/Button';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { RoleType } from '@/types/app/users';
import { Role } from './Role';
import { Main } from './Main';
import { RoleInCollapseHeader } from './RoleInCollapseHeader';
import {
  MAIN_COLLAPSE,
  ROLE_COLLAPSE,
  FormI,
  initialValues,
  validate
} from './helpers';

import cls from './CreateUser.module.scss';

export const CreateUser: React.FC = observer(() => {
  const router = useRouter();

  const { createUser } = useContext(UsersContext);

  const [collapse, setCollapse] = useState<number>(ROLE_COLLAPSE);
  const [file, setFile] = useState<Blob | null>(null);

  const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
    let photo_link;
    if (file) {
      // upload file
    }
    createUser({ ...form, photo_link })
      .then(() => {
        router.push('/app/users');
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  const form = useFormik<FormI>({
    initialValues,
    validate: (values) => validate(values, true),
    onSubmit: (values, helpers) => {
      submit(values, helpers);
    }
  });

  const toggleCollapse = (): void => {
    if (collapse === ROLE_COLLAPSE) {
      if (!form.values.role) {
        form.setFieldTouched('role');
      } else {
        setCollapse(MAIN_COLLAPSE);
      }
    } else {
      setCollapse(ROLE_COLLAPSE);
      form.setFieldTouched('subjectId');
    }
  };

  const checkRole = (role: RoleType) => {
    form.setFieldValue('role', role);
    setCollapse(MAIN_COLLAPSE);
  };

  useEffect(() => {
    const password = nanoid(16);
    form.setFieldValue('password', password);
  }, []);

  return (
    <section className={cls.root}>
      <div className={cls.header}>
        <h1>Создание пользователя</h1>
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
          isOpen={collapse === ROLE_COLLAPSE}
          onClick={toggleCollapse}
          title="Роль"
          headerChildren={
            collapse !== ROLE_COLLAPSE && (
              <RoleInCollapseHeader role={form.values.role} />
            )
          }
        >
          <Role form={form} onCheckRole={checkRole} />
        </SectionCollapse>

        <SectionCollapse
          isOpen={collapse === MAIN_COLLAPSE}
          onClick={toggleCollapse}
          title="Основная информация"
        >
          <Main form={form} onFileLoad={setFile} />
        </SectionCollapse>
      </form>
    </section>
  );
});
