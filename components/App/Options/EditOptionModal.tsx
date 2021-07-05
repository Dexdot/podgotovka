import React, { useEffect } from 'react';
import { FormikHelpers, useFormik } from 'formik';

import { OptionI } from '@/types/common';

import { CommonModal } from '@/components/modals/CommonModal/CommonModal';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';

import { CloseIcon } from './Icons';
import { FormI, initialValues, validate, optionTypes } from './helpers';

import cls from './Options.module.scss';

interface PropsI {
  option: OptionI | null;
  isOpen: boolean;
  close: () => void;
  submit: (form: FormI, helpers: FormikHelpers<FormI>) => void;
}

export const EditOptionModal: React.FC<PropsI> = ({
  option,
  close,
  isOpen,
  submit
}) => {
  const form = useFormik<FormI>({
    initialValues,
    validate: (values) => validate(values),
    onSubmit: (values, helpers) => {
      submit(values, helpers);
    }
  });

  useEffect(() => {
    if (option) {
      form.setValues({ ...option });
    } else {
      form.setValues(initialValues);
    }
  }, [option]);

  return (
    <CommonModal isOpen={isOpen} close={close} containerClass={cls.modal}>
      <div className={cls.modal_header}>
        <h2>{option ? 'Редактировать опцию' : 'Добавить опцию'}</h2>
        <button type="button" onClick={close}>
          <CloseIcon />
        </button>
      </div>

      <form onSubmit={form.handleSubmit} id="option_form">
        <div className={cls.input}>
          <Input
            name="name"
            placeholder="Название опции*"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorText={form.touched.name ? form.errors.name : ''}
          />
          <p>Название будет отображаться у учеников</p>
        </div>
        <div className={cls.input}>
          <Input
            name="description"
            placeholder="Описание опции"
            value={form.values.description || ''}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorText={form.touched.description ? form.errors.description : ''}
          />
          <p>Описание будут видеть только администраторы платформы</p>
        </div>

        <h3>Формат</h3>
        <Dropdown
          value={
            optionTypes.find((item) => item.id === form.values.type) || null
          }
          onChange={(value) => form.setFieldValue('type', value.id)}
          items={optionTypes}
          disabled={!!option}
        />
      </form>

      <div className={cls.br} />

      <div className={cls.footer}>
        <Button onClick={close} variant="secondary">
          Отмена
        </Button>
        <Button
          type="submit"
          form="option_form"
          loading={form.isSubmitting}
          disabled={!form.isValid || form.isSubmitting}
        >
          Сохранить
        </Button>
      </div>
    </CommonModal>
  );
};
