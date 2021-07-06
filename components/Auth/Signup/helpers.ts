import { validateEmail } from '@/utils/validation';

type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  name: string;
  email: string;
  password: string;
}

export const initialValues: FormI = { name: '', email: '', password: '' };

export const validate = (values: FormI): Errors => {
  const errors = {} as Errors;
  const { name, email, password } = values;

  // Name
  if (!name) {
    errors.name = 'Введите имя';
  }

  // Email
  if (!email) {
    errors.email = 'Введите почту';
  } else if (!validateEmail(email)) {
    errors.email = 'Введите валидную почту';
  }

  // Password
  if (!password) {
    errors.password = 'Введите пароль';
  } else if (password.length < 6) {
    errors.password = 'Не менее 6 символов';
  }

  return errors;
};
