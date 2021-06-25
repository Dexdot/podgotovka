export interface CreateOptionI {
  name: string;
  desc?: string;
  formatId: number;
}

export interface UpdateOptionI extends CreateOptionI {
  id: number;
}

export interface OptionI extends CreateOptionI {
  id: number;
  date: number;
  isSystem: boolean;
}

export interface SearchParamsI {
  search?: string;
  formatId?: number;
}
