import { AxiosResponse } from 'axios';

import {
  CategoryI,
  CreateCategoryI,
  CreateMaterialI,
  MaterialDetailI,
  SearchMaterialI,
  SearchMaterialsI,
  UpdateCategoryI,
  UpdateMaterialI
} from '@/types/library';

import { PodgotovkaAPI } from '@/api/instance';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH_CATEGORIES = '/core/v1/lib-categories';
const SERVICE_PATH_MATERIALS = '/core/v1/lib-materials';

// CATEGORIES

export function fetch({
  subject_id,
  q
}: {
  subject_id: number;
  q?: string;
}): Promise<AxiosResponse<CategoryI[]>> {
  return axios.get<CategoryI[]>(
    `${SERVICE_PATH_CATEGORIES}/subjects/${subject_id}`,
    {
      params: { q }
    }
  );
}

export function createCategory(
  data: CreateCategoryI
): Promise<AxiosResponse<CategoryI>> {
  return axios.post<CategoryI>(`${SERVICE_PATH_CATEGORIES}`, {
    ...data
  });
}

export function removeCategory({
  category_id
}: {
  category_id: number;
}): Promise<AxiosResponse<{ result: boolean }>> {
  return axios.delete<{ result: boolean }>(
    `${SERVICE_PATH_CATEGORIES}/subjects/${category_id}`
  );
}

export function updateCategory(
  data: UpdateCategoryI
): Promise<AxiosResponse<CategoryI>> {
  const { category_id, name } = data;
  return axios.patch<CategoryI>(
    `${SERVICE_PATH_CATEGORIES}/subjects/${category_id}`,
    { name }
  );
}

// MATERIALS

export function fetchMaterials(params: {
  limit?: number;
  skip?: number;
  q?: string;
}): Promise<AxiosResponse<SearchMaterialsI>> {
  return axios.get<SearchMaterialsI>(`${SERVICE_PATH_MATERIALS}`, {
    params: { ...params }
  });
}

export function createMaterial(
  data: CreateMaterialI
): Promise<AxiosResponse<MaterialDetailI>> {
  return axios.post<MaterialDetailI>(`${SERVICE_PATH_MATERIALS}`, { ...data });
}

export function getAutocomplete({
  q
}: {
  q?: string;
}): Promise<AxiosResponse<SearchMaterialI[]>> {
  return axios.get<SearchMaterialI[]>(`${SERVICE_PATH_MATERIALS}/search`, {
    params: { q }
  });
}

export function fetchMaterialDetail({
  material_id
}: {
  material_id: number;
}): Promise<AxiosResponse<MaterialDetailI>> {
  return axios.get<MaterialDetailI>(`${SERVICE_PATH_MATERIALS}/${material_id}`);
}

export function removeMaterial({
  material_id
}: {
  material_id: number;
}): Promise<AxiosResponse<{ result: boolean }>> {
  return axios.delete<{ result: boolean }>(
    `${SERVICE_PATH_MATERIALS}/${material_id}`
  );
}

export function updateMaterial(
  data: UpdateMaterialI
): Promise<AxiosResponse<MaterialDetailI>> {
  const { material_id, ...rest } = data;
  return axios.patch<MaterialDetailI>(
    `${SERVICE_PATH_MATERIALS}/${material_id}`,
    { ...rest }
  );
}

export function changeMaterialStatus({
  material_id
}: {
  material_id: number;
}): Promise<AxiosResponse<{ result: boolean }>> {
  return axios.patch<{ result: boolean }>(
    `${SERVICE_PATH_MATERIALS}/${material_id}/change_status`
  );
}

export function copyMaterial({
  material_id
}: {
  material_id: number;
}): Promise<AxiosResponse<MaterialDetailI>> {
  return axios.post<MaterialDetailI>(
    `${SERVICE_PATH_MATERIALS}/${material_id}/copy`
  );
}

export function orderMaterials({
  id_order_list,
  category_id
}: {
  id_order_list: number[];
  category_id: number;
}): Promise<AxiosResponse<{ result: boolean }>> {
  return axios.patch<{ result: boolean }>(
    `${SERVICE_PATH_MATERIALS}/${category_id}/order`,
    { id_order_list }
  );
}

export const LibraryAPI = {
  fetch,
  createCategory,
  removeCategory,
  updateCategory,
  fetchMaterials,
  createMaterial,
  getAutocomplete,
  fetchMaterialDetail,
  removeMaterial,
  updateMaterial,
  changeMaterialStatus,
  copyMaterial,
  orderMaterials
};
