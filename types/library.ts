import { SubjectI } from '@/types/subjects';

export interface MaterialI {
  id: number;
  name: string;
  is_published: boolean;
}

export interface MaterialAuthorI {
  id: number;
  name: string;
  photo_link: string;
}

export interface CategoryI {
  id: number;
  name: string;
  materials: MaterialI[];
}

export interface CreateCategoryI {
  subject_id: number;
  name: string;
}

export interface UpdateCategoryI {
  category_id: number;
  name: string;
}

export interface SearchMaterialI {
  id: number;
  name: string;
  text: string;
  subject: SubjectI;
}

export interface SearchMaterialsI {
  number_of_results: number;
  materials: SearchMaterialI[];
}

export interface MaterialDetailI {
  id: number;
  created_at: number;
  edited_at: number;
  name: string;
  text: string;
  author: MaterialAuthorI;
  likes_number: number;
  dislikes_number: number;
  is_published: boolean;
}

export interface CreateMaterialI {
  category_id: number;
  name: string;
}

export interface UpdateMaterialI {
  material_id: number;
  category_id: number;
  name: string;
  text: string;
}
