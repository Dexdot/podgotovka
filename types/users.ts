export interface NewUserI {
  name: string;
  login: string;
  pass: string;
  vk?: string;
  photo_link?: string;
  subjectId: string;
  roleId: string;
}

export interface UpdateUserI {
  id: number;
  name?: string;
  login?: string;
  vk?: string;
  photo_link?: string;
  subjectId?: string;
  statusId?: string;
}

export interface UserI {
  id: number;
  name: string;
  login: string;
  photo_link?: string;
  subjectId: string;
  roleId: string;
  statusId: string;
}

export interface UserDetailI extends NewUserI {
  id: number;
  statusId: string;
}

export interface SearchParamsI {
  search?: string;
  statusId?: string;
  subjectId?: string;
  roleId?: string;
}
