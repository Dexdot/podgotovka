export const ROLE_COLLAPSE = 1;
export const MAIN_COLLAPSE = 2;

type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  login: string;
  password: string;
  name: string;
  role: string;
  subject_id: number;
  vk_link?: string;
  photo_link?: string;
}

export const initialValues: FormI = {
  role: '',
  name: '',
  login: '',
  vk_link: undefined,
  password: '',
  subject_id: -1,
  photo_link: undefined
};

export const validate = (values: FormI, isUserNew: boolean): Errors => {
  const errors = {} as Errors;
  const { role, name, login, password, subject_id } = values;

  if (isUserNew && !role) {
    errors.role = 'Выберите роль';
  }

  if (!name) {
    errors.name = 'Введите ФИО';
  }

  if (!login) {
    errors.login = 'Введите логин';
  }

  if (!password) {
    errors.password = 'Введите пароль';
  }

  if (subject_id === -1) {
    errors.subject_id = 'Выберите предмет';
  }

  return errors;
};
