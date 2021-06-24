import {
  LevelType,
  OptionI,
  OptionType,
  OptionValueType
} from '@/types/common';

export type ValueType = {
  level_id: number;
  option_id: number;
  value: OptionValueType;
};

export function getInitialOptionValue(type: OptionType): OptionValueType {
  if (type === 'string') {
    return '';
  }

  if (type === 'numeric') {
    return 0;
  }

  return false;
}

export function getInitialValues(
  option: OptionI,
  levels: LevelType[]
): ValueType[] {
  return levels.map((l) => {
    return {
      level_id: l.id,
      option_id: option.id,
      value: getInitialOptionValue(option.type)
    };
  });
}
