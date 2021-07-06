import { RoleType } from '@/types/app/users';

import { hasSubjects } from '../helpers';

export const ROLE_COLLAPSE = 1;
export const MAIN_COLLAPSE = 2;

type Errors = {
  [K in keyof FormI]: string;
};

export interface FormI {
  login: string;
  name: string;
  role: RoleType;
  subject_id?: number;
  is_active: boolean;
  password: string;
  vk_link?: string;
  photo_link?: string;
}

export const initialValues: FormI = {
  role: 'teacher',
  name: '',
  login: '',
  subject_id: undefined,
  is_active: false,
  password: '',
  photo_link: undefined,
  vk_link: undefined
};

export const validate = (values: FormI): Errors => {
  const errors = {} as Errors;
  const { name, login, subject_id, role } = values;

  if (!name) {
    errors.name = 'Введите ФИО';
  }

  if (!login) {
    errors.login = 'Введите логин';
  }

  if (!subject_id && hasSubjects(role)) {
    errors.subject_id = 'Выберите предмет';
  }

  return errors;
};
