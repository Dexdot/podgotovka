type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  login: string;
  password: string;
}

export const initialValues: FormI = { login: '', password: '' };

export const validate = (values: FormI): Errors => {
  const errors = {} as Errors;
  const { login, password } = values;

  // Login
  if (!login) {
    errors.login = 'Введите логин';
  }

  // Password
  if (!password) {
    errors.password = 'Введите пароль';
  } else if (password.length < 6) {
    errors.password = 'Не менее 6 символов';
  }

  return errors;
};
