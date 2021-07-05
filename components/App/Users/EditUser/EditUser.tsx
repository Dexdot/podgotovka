import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

import { UsersContext } from '@/store/app/users';

import { Button } from '@/components/common/Button/Button';
import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { PersonalData } from './PersonalData';
import { RolesAndSubjects } from './RolesAndSubjects';
import { Password } from './Password';
import { FormI, initialValues, validate } from './helpers';

import cls from './EditUser.module.scss';

export const EditUser: React.FC = observer(() => {
  const router = useRouter();
  const { id } = router.query;

  const {
    updateUser,
    fetchUserDetails,
    userDetails,
    userDetailsLoadingState,
    resetUserPassword
  } = useContext(UsersContext);

  const [file, setFile] = useState<Blob | null>(null);
  const [refreshBtnDisabled, toggleRefreshBtn] = useState<boolean>(false);

  const submit = (form: FormI, helpers: FormikHelpers<FormI>) => {
    let photo_link;
    if (file) {
      // await upload photo
    }
    const { password, ...formData } = form;
    updateUser({ ...formData, id: Number(id), photo_link })
      .then(() => {
        router.push(`/app/users/${id}`);
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  const form = useFormik<FormI>({
    initialValues,
    validate: (values) => validate(values),
    onSubmit: (values, helpers) => {
      submit(values, helpers);
    }
  });

  const refreshPassword = useCallback(() => {
    const password = nanoid(16);
    toggleRefreshBtn(true);
    resetUserPassword({ id: Number(id), password }).then(() => {
      form.setFieldValue('password', password);
      toggleRefreshBtn(false);
    });
  }, [id, resetUserPassword, form]);

  const updateUserDetails = useCallback(
    (userId: number) => {
      if (userDetailsLoadingState === 'loading') {
        setTimeout(() => {
          updateUserDetails(userId);
        }, 200);
      } else if (!userDetails.id || userDetails.id !== userId) {
        fetchUserDetails(userId);
      }
    },
    [userDetailsLoadingState, fetchUserDetails, userDetails]
  );

  useEffect(() => {
    if (id) {
      updateUserDetails(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (userDetails.id) {
      const { subject, created_at, ...details } = userDetails;
      form.setValues({
        ...details,
        subject_id: subject?.id
      });
    }
  }, [userDetails]);

  return (
    <section className={cls.root}>
      <div className={cls.header}>
        <h1>Изменить пользователя</h1>
        <div className={cls.header_btns}>
          <ButtonLink href={`/app/users/${id}`} variant="grey">
            Отмена
          </ButtonLink>
          <Button
            type="submit"
            form="role-form"
            loading={form.isSubmitting}
            disabled={!form.isValid || form.isSubmitting}
          >
            Сохранить
          </Button>
        </div>
      </div>

      <form id="role-form" onSubmit={form.handleSubmit}>
        <SectionCollapse title="Личные данные" isOpen>
          <PersonalData form={form} onFileLoad={setFile} />
        </SectionCollapse>

        <SectionCollapse title="Доступы и роли" isOpen>
          <RolesAndSubjects form={form} />
        </SectionCollapse>

        <SectionCollapse title="Пароль" isOpen>
          <Password
            form={form}
            onRefresh={refreshPassword}
            refreshBtnDisabled={refreshBtnDisabled}
          />
        </SectionCollapse>
      </form>
    </section>
  );
});
