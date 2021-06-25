import React, { useContext, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { FormikHelpers, useFormik } from 'formik';

import { OptionsContext } from '@/store/options';

import { showAlert } from '@/utils/network';
import { OPTION_FORMATS } from '@/utils/consts';

import { CommonModal } from '@/components/modals/CommonModal/CommonModal';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import { CloseIcon } from './Icons';
import { FormI, initialValues, validate } from './helpers';

import cls from './Options.module.scss';

interface PropsI {
  optionId: number | null;
  isOpen: boolean;
  close: () => void;
}

export const EditOptionModal: React.FC<PropsI> = observer(
  ({ optionId, close, isOpen }) => {
    const { options, updateOption, createOption } = useContext(OptionsContext);

    const optionFormats = useMemo<DropdownItem[]>(
      () =>
        OPTION_FORMATS.map((item) => ({
          id: item.type,
          text: item.name
        })),
      []
    );

    const submit = async (form: FormI, helpers: FormikHelpers<FormI>) => {
      try {
        if (optionId) {
          updateOption({
            id: optionId,
            description: form.description,
            name: form.name
          });
        } else {
          createOption({ ...form });
        }
        close();
        helpers.resetForm();
      } catch (error) {
        showAlert({ error });
      } finally {
        helpers.setSubmitting(false);
      }
    };

    const form = useFormik<FormI>({
      initialValues,
      validate: (values) => validate(values),
      onSubmit: (values, helpers) => {
        submit(values, helpers);
      }
    });

    const handleClose = () => {
      close();
      form.resetForm();
    };

    useEffect(() => {
      if (optionId) {
        const option = options.find((item) => item.id === optionId);
        if (option) {
          form.setValues({ ...option });
        }
      }
    }, [optionId, options]);

    return (
      <CommonModal
        isOpen={isOpen}
        close={handleClose}
        containerClass={cls.modal}
      >
        <div className={cls.modal_header}>
          <h2>{optionId ? 'Редактировать опцию' : 'Добавить опцию'}</h2>
          <button type="button" onClick={handleClose}>
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
              errorText={
                form.touched.description ? form.errors.description : ''
              }
            />
            <p>Описание будут видеть только администраторы платформы</p>
          </div>

          <h3>Формат</h3>
          <Dropdown
            value={
              optionFormats.find((item) => item.id === form.values.type) || null
            }
            onChange={(value) => form.setFieldValue('type', value.id)}
            items={optionFormats}
            disabled={!!optionId}
          />
        </form>

        <div className={cls.br} />

        <div className={cls.footer}>
          <Button onClick={handleClose} variant="secondary">
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
  }
);
