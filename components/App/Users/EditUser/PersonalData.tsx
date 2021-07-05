import React from 'react';
import { FormikProps } from 'formik';

import { Input } from '@/components/common/Input/Input';
import { ImagePicker } from '@/components/common/ImagePicker/ImagePicker';

import { FormI } from './helpers';

import cls from './EditUser.module.scss';

interface PropsI {
  form: FormikProps<FormI>;
  onFileLoad: (file: Blob | null) => void;
}

export const PersonalData: React.FC<PropsI> = ({ form, onFileLoad }) => {
  return (
    <div className={cls.form}>
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
    </div>
  );
};
