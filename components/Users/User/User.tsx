import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik, FormikHelpers } from 'formik';

import { Input } from '@/components/common/Input/Input';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { Button } from '@/components/common/Button/Button';
import { ImagePicker } from '@/components/common/ImagePicker/ImagePicker';
import { SectionCollapse } from '@/components/common/SectionCollapse/SectionCollapse';

import { copyToClipboard } from '@/utils/copyToClipboard';
import { showAlert } from '@/utils/network';

import {
  MAIN_COLLAPSE,
  ROLE_COLLAPSE,
  FormI,
  initialValues,
  validate
} from './helpers';
import { TODO_ROLE_ITEMS, TODO_SUBJECT_ITEMS } from '../helpers';
import { CopyIcon, UserIcon } from './Icons';

import cls from './User.module.scss';

export const User: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [collapse, setCollapse] = useState<number>(ROLE_COLLAPSE);
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<string>('');

  const isNewUser = useMemo<boolean>(() => !!id && id === 'create', [id]);

  const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
    try {
      // upload photo and submit user form
      console.log(form, file);
      router.push('/app/users');
    } catch (error) {
      showAlert({ error });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const form = useFormik<FormI>({
    initialValues,
    validate: (values) => validate(values, isNewUser),
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
    form.setFieldValue('roleId', roleId).then(() => setCollapse(MAIN_COLLAPSE));
  };

  useEffect(() => {
    if (!isNewUser) {
      // fetch user data
      form.setValues({
        roleId: '1',
        name: 'Иванов Иван',
        login: 'ivanov',
        subjectId: '1',
        pass: '12345678'
      });
    } else {
      // generate random pass for user
      form.setFieldValue('pass', 'рандомный пароль');
    }
  }, [isNewUser]);

  return (
    <section className={cls.root}>
      <div className={cls.header}>
        <h1>
          {isNewUser ? 'Создание пользователя' : 'Редактирование пользователя'}
        </h1>
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
          title="Роль"
          onClick={toggleCollapse}
          headerChildren={
            form.values.roleId &&
            collapse !== ROLE_COLLAPSE && (
              <div className={cls.collapse_header}>
                <UserIcon />
                <p className={cls.collapse_header_text}>
                  {
                    TODO_ROLE_ITEMS.find(
                      (item) => item.id === form.values.roleId
                    )?.text
                  }
                </p>
              </div>
            )
          }
        >
          <h3>Выберите роль пользователя</h3>

          {TODO_ROLE_ITEMS.map((item) => (
            <div key={item.id} className={cls.checkbox}>
              <Checkbox
                id={`role_${item.id}`}
                onChange={() => checkRole(item.id)}
                checked={form.values.roleId === item.id}
                disabled={!isNewUser}
              />
              <label htmlFor={`role_${item.id}`}>{item.text}</label>
            </div>
          ))}
          {form.touched.roleId && form.errors.roleId && (
            <p className={cls.error}>{form.errors.roleId}</p>
          )}
        </SectionCollapse>

        <SectionCollapse
          isOpen={collapse === MAIN_COLLAPSE}
          title="Основная информация"
          onClick={toggleCollapse}
        >
          <div className={cls.form}>
            <h2>Основная информация</h2>

            <div className={cls.image_picker}>
              <ImagePicker href={photo} onChange={setFile} />
            </div>

            <div className={cls.input}>
              <Input
                name="name"
                placeholder="ФИО*"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                errorText={form.touched.name ? form.errors.name : ''}
              />
            </div>
            <div className={cls.input}>
              <Input
                name="login"
                placeholder="Логин*"
                value={form.values.login}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                errorText={form.touched.login ? form.errors.login : ''}
              />
            </div>
            <div className={cls.input}>
              <Input
                name="vk"
                placeholder="Ссылка VK*"
                value={form.values.vk || ''}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                errorText={form.touched.vk ? form.errors.vk : ''}
              />
            </div>

            <div className={cls.br} />

            <h3>
              Пароль для пользователя система генерирует автоматически.
              <br />
              Скопируйте и передайте логин и пароль нужному пользователю.
            </h3>

            <div className={cls.pass}>
              <Input
                name="pass"
                placeholder="Пароль*"
                value={form.values.pass}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                errorText={form.touched.pass ? form.errors.pass : ''}
                disabled
              />
              <button
                onClick={() => copyToClipboard(form.values.pass)}
                type="button"
                className={cls.copy}
              >
                <CopyIcon />
                <p>Скопировать пароль</p>
              </button>
            </div>

            <div className={cls.br} />

            <h2>Предмет</h2>
            <h3>Выберите предмет, к которому будет закреплен пользователь</h3>

            {TODO_SUBJECT_ITEMS.map((item) => (
              <div key={item.id} className={cls.checkbox}>
                <Checkbox
                  id={`subject_${item.id}`}
                  onChange={() => form.setFieldValue('subjectId', item.id)}
                  checked={form.values.subjectId === item.id}
                />
                <label htmlFor={`subject_${item.id}`}>{item.text}</label>
              </div>
            ))}
            {form.touched.subjectId && form.errors.subjectId && (
              <p className={cls.error}>{form.errors.subjectId}</p>
            )}
          </div>
        </SectionCollapse>
      </form>
    </section>
  );
};
