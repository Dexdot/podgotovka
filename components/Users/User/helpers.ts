export const ROLE_COLLAPSE = 1;
export const MAIN_COLLAPSE = 2;

type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  roleId: string;
  name: string;
  login: string;
  pass: string;
  subjectId: string;
  vk?: string;
  photo_link?: string;
}

export const initialValues: FormI = {
  roleId: '',
  name: '',
  login: '',
  vk: '',
  pass: '',
  subjectId: '',
  photo_link: ''
};

export const validate = (values: FormI, isUserNew: boolean): Errors => {
  const errors = {} as Errors;
  const { roleId, name, login, pass, subjectId } = values;

  if (isUserNew && !roleId) {
    errors.roleId = 'Выберите роль';
  }

  if (!name) {
    errors.name = 'Введите ФИО';
  }

  if (!login) {
    errors.login = 'Введите логин';
  }

  if (!pass) {
    errors.pass = 'Введите пароль';
  }

  if (!subjectId) {
    errors.subjectId = 'Выберите предмет';
  }

  return errors;
};
