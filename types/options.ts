export interface CreateOptionI {
  name: string;
  description?: string;
  type: string;
}

export interface UpdateOptionI {
  id: number;
  name?: string;
  description?: string;
}

export interface SearchParamsI {
  search?: string;
  type?: string;
  limit?: number;
  skip?: number;
}
