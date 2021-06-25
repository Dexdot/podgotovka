import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

import { UsersContext } from '@/store/users';

import { showAlert } from '@/utils/network';

import { Button } from '@/components/common/Button/Button';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

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

import cls from './User.module.scss';

export const CreateUser: React.FC = observer(() => {
  const router = useRouter();

  const { addUser } = useContext(UsersContext);

  const [collapse, setCollapse] = useState<number>(ROLE_COLLAPSE);
  const [file, setFile] = useState<Blob | null>(null);

  const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
    try {
      console.log(file);
      // upload file
      const photo_link = '';
      addUser({ ...form, photo_link });
      router.push('/app/users');
    } catch (error) {
      showAlert({ error });
    } finally {
      helpers.setSubmitting(false);
    }
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
      if (!form.values.roleId) {
        form.setFieldTouched('roleId');
      } else {
        setCollapse(MAIN_COLLAPSE);
      }
    } else {
      setCollapse(ROLE_COLLAPSE);
      form.setFieldTouched('subjectId');
    }
  };

  const checkRole = (roleId: string) => {
    form.setFieldValue('roleId', roleId);
    setCollapse(MAIN_COLLAPSE);
  };

  useEffect(() => {
    const pass = nanoid(16);
    form.setFieldValue('pass', pass);
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

      <form id="role-form">
        <SectionCollapse
          isOpen={collapse === ROLE_COLLAPSE}
          onClick={toggleCollapse}
          title="Роль"
          headerChildren={
            collapse !== ROLE_COLLAPSE && (
              <RoleInCollapseHeader roleId={form.values.roleId} />
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
          <Main form={form} onFileLoad={setFile} photo="" />
        </SectionCollapse>
      </form>
    </section>
  );
});
