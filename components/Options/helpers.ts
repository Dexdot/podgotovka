import { OptionType } from '@/types/common';

import { OPTION_TYPES } from '@/utils/consts';

import { DropdownType } from '@/components/common/Dropdown/Dropdown';

type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  name: string;
  description?: string;
  type: OptionType;
}

export const initialValues: FormI = {
  name: '',
  description: '',
  type: 'string'
};

export const validate = (values: FormI): Errors => {
  const errors = {} as Errors;
  const { name } = values;

  if (!name) {
    errors.name = 'Введите название опции';
  }

  return errors;
};

export const optionTypes: DropdownType[] = OPTION_TYPES.map((item) => ({
  id: item.type,
  text: item.name
}));
