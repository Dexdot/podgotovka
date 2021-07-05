import { SubjectI } from '@/types/subjects';

export type RoleType =
  | 'admin'
  | 'teacher'
  | 'checker'
  | 'curator'
  | 'helper'
  | 'student';

export interface NewUserI {
  login: string;
  password: string;
  name: string;
  role: RoleType;
  photo_link?: string;
  vk_link?: string;
  subject_id: number;
}

export interface UpdateUserI {
  id: number;
  name?: string;
  login?: string;
  vk_link?: string;
  photo_link?: string;
  subjectId?: number;
  is_active: boolean;
}

export interface UserI {
  id: number;
  name: string;
  login: string;
  role: RoleType;
  is_active: boolean;
  vk_link?: string;
  photo_link?: string;
  subject?: SubjectI;
}

export interface UserMeI extends UserI {
  created_at: number;
}

export interface UserDetailsI extends UserI {
  created_at: number;
  password: string;
}

export interface SearchParamsI {
  role?: RoleType;
  is_active?: boolean;
  subject_id?: number;
  name_like?: string;
  limit?: number;
  skip?: number;
}
