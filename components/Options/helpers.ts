type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  name: string;
  desc?: string;
  formatId: number;
}

export const initialValues: FormI = {
  name: '',
  desc: '',
  formatId: 1
};

export const validate = (values: FormI): Errors => {
  const errors = {} as Errors;
  const { name } = values;

  if (!name) {
    errors.name = 'Введите название опции';
  }

  return errors;
};
