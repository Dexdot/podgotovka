import React from 'react';
import { FormikProps } from 'formik';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { copyToClipboard } from '@/utils/copyToClipboard';

import { Input } from '@/components/common/Input/Input';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { ImagePicker } from '@/components/common/ImagePicker/ImagePicker';

import { CopyIcon } from '../Icons';
import { FormI } from './helpers';

import cls from './CreateUser.module.scss';

interface PropsI {
  form: FormikProps<FormI>;
  onFileLoad: (file: Blob | null) => void;
}

export const Main: React.FC<PropsI> = ({ form, onFileLoad }) => {
  const subjects = useSubjects();

  return (
    <div className={cls.form}>
      <h2>Основная информация</h2>

      <div className={cls.image_picker}>
        <ImagePicker
          href={form.values.photo_link || ''}
          onChange={onFileLoad}
        />
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
          name="vk_link"
          placeholder="Ссылка VK"
          value={form.values.vk_link || ''}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorText={form.touched.vk_link ? form.errors.vk_link : ''}
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
          className={cls.copy}
        >
          <CopyIcon />
          <p>Скопировать пароль</p>
        </button>
      </div>

      <div className={cls.br} />

      <h2>Предмет</h2>
      <h3>Выберите предмет, к которому будет закреплен пользователь</h3>

      {subjects?.map((item) => (
        <div key={item.id} className={cls.checkbox}>
          <Checkbox
            id={`subject_${item.id}`}
            onChange={() => form.setFieldValue('subject_id', item.id)}
            checked={form.values.subject_id === item.id}
          />
          <label htmlFor={`subject_${item.id}`}>{item.name}</label>
        </div>
      ))}
      {form.touched.subject_id && form.errors.subject_id && (
        <p className={cls.error}>{form.errors.subject_id}</p>
      )}
    </div>
  );
};
