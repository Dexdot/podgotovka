import React from 'react';
import { FormikProps } from 'formik';

import { useSubjects } from '@/api/hooks/useSubjects';

import { copyToClipboard } from '@/utils/copyToClipboard';

import { Input } from '@/components/common/Input/Input';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { ImagePicker } from '@/components/common/ImagePicker/ImagePicker';

import { CopyIcon } from './Icons';
import { FormI } from './helpers';

import cls from './User.module.scss';

interface PropsI {
  form: FormikProps<FormI>;
  photo: string;
  onFileLoad: (file: Blob | null) => void;
}

export const Main: React.FC<PropsI> = ({ form, photo, onFileLoad }) => {
  const [subjects] = useSubjects();

  return (
    <div className={cls.form}>
      <h2>Основная информация</h2>

      <div className={cls.image_picker}>
        <ImagePicker href={photo} onChange={onFileLoad} />
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

      {subjects.map((item) => (
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
  );
};
