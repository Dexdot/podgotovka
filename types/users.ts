import { SubjectI } from '@/types/subjects';

export interface NewUserI {
  login: string;
  password: string;
  name: string;
  role: string;
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
}

export interface UserI {
  id: number;
  name: string;
  login: string;
  role: string;
  is_active: boolean;
  vk_link?: string;
  photo_link?: string;
  subject: SubjectI;
}

export interface UserDetailsI extends UserI {
  created_at: number;
}

export interface SearchParamsI {
  role?: string;
  is_active?: boolean;
  subject_id?: number;
  name_like?: string;
  limit?: number;
  skip?: number;
}
