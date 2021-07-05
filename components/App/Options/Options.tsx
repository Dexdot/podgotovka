import React, { useCallback, useMemo, useState } from 'react';
import { FormikHelpers } from 'formik';
import cn from 'classnames';

import { OptionI } from '@/types/common';
import { SearchParamsI } from '@/types/app/options';

import { OptionsAPI } from '@/api/app/options';
import { useFilteredOptions } from '@/api/app/hooks/options/useFilteredOptions';
import { useDebounce } from '@/hooks/useDebounce';

import { showAlert } from '@/utils/network';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';
import { Button } from '@/components/common/Button/Button';

import { Table } from './Table';
import { EditOptionModal } from './EditOptionModal';

import { optionTypes, FormI } from './helpers';
import cls from './Options.module.scss';

export const Options: React.FC = () => {
  const [option, setOption] = useState<OptionI | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [type, setType] = useState<DropdownType | null>(null);

  const params = useMemo<SearchParamsI>(
    () => ({ search: debouncedSearch, type: type?.id }),
    [debouncedSearch, type]
  );

  const [options, setOptions] = useFilteredOptions(params);

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
    [options, setOptions, option, close]
  );

  return (
    <section className={cls.root}>
      <header className={cls.flex_center}>
        <h1>Опции</h1>
        <Button onClick={() => setOpen(true)}>Добавить опцию</Button>
      </header>
      <div className={cn(cls.filters, cls.flex_center)}>
        <div className={cn(cls.search, cls.input)}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Поиск"
            search
          />
        </div>
        <div className={cn(cls.input)}>
          <Dropdown
            items={optionTypes}
            value={type}
            onChange={setType}
            placeholder="Формат"
          />
        </div>
      </div>
      <Table open={open} options={options} />
      <EditOptionModal
        isOpen={isOpen}
        option={option}
        submit={submit}
        close={close}
      />
    </section>
  );
};
