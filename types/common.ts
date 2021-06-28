export type OrderType = 'asc' | 'desc';

export type TariffLevelType = 'one' | 'many';

export type DirectionType = 'USE' | 'BSE';

export type LoadingStateType = 'pending' | 'done' | 'error';

export interface LevelI {
  id: number;
  name: string;
}

export type TariffValueType = {
  level_id: number;
  option_id: number;
  value: OptionValueType;
};

export type OptionType = 'string' | 'numeric' | 'boolean';
export type OptionValueType = string | number | boolean;

export interface OptionI {
  id: number;
  name: string;
  description?: string;
  type: OptionType;
  is_systemic: boolean;
  created_at: number;
}

export type DirectionItem = {
  id: string;
  text: string;
  value: string;
};
