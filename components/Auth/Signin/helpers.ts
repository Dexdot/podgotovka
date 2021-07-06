type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  username: string;
  password: string;
}

export const initialValues: FormI = { username: '', password: '' };

export const validate = (values: FormI): Errors => {
  const errors = {} as Errors;
  const { username, password } = values;

  // Login
  if (!username) {
    errors.username = 'Введите логин';
  }

  // Password
  if (!password) {
    errors.password = 'Введите пароль';
  } else if (password.length < 6) {
    errors.password = 'Не менее 6 символов';
  }

  return errors;
};
