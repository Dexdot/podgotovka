export type OrderType = 'asc' | 'desc';

export type TariffLevelType = 'one' | 'many';

export type DirectionType = 'USE' | 'BSE';

export type LevelType = {
  id: number;
  name: string;
};

export type OptionType = 'string' | 'numeric' | 'boolean';
export type OptionValueType = string | number | boolean;

export interface OptionI {
  id: number;
  name: string;
  type: OptionType;
}
