import { OptionType } from '@/types/common';

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
