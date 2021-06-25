import React, { useCallback, useState } from 'react';
import { FormikHelpers } from 'formik';

import { OptionI } from '@/types/common';

import { OptionsAPI } from '@/api/options';
import { useOptions } from '@/api/hooks/options/useOptions';

import { showAlert } from '@/utils/network';

import { Button } from '@/components/common/Button/Button';

import { Search } from './Search';
import { Table } from './Table';
import { EditOptionModal } from './EditOptionModal';
import { FormI } from './helpers';

import cls from './Options.module.scss';

export const Options: React.FC = () => {
  const [option, setOption] = useState<OptionI | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [options, setOptions, fetchOptions] = useOptions();

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setOption(null);
    }, 250);
  }, []);

  const open = useCallback((newOption: OptionI) => {
    setOpen(true);
    setOption(newOption);
  }, []);

  const submit = useCallback(
    async (form: FormI, helpers: FormikHelpers<FormI>) => {
      try {
        if (option) {
          const { data } = await OptionsAPI.updateOption({
            ...form,
            id: option.id
          });
          const newOptions = options.map((item) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          });
          setOptions(newOptions);
        } else {
          const { data } = await OptionsAPI.createOption({ ...form });
          setOptions([...options, data]);
        }
        close();
        helpers.resetForm();
      } catch (error) {
        showAlert({ error });
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [options, setOptions]
  );

  return (
    <section className={cls.root}>
      <header className={cls.flex_center}>
        <h1>Опции</h1>
        <Button onClick={() => setOpen(true)}>Добавить опцию</Button>
      </header>
      <Search fetch={fetchOptions} />
      <Table options={options} open={open} />
      <EditOptionModal
        isOpen={isOpen}
        option={option}
        submit={submit}
        close={close}
      />
    </section>
  );
};
