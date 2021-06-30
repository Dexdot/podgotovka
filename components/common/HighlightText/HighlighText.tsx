import React, { useMemo } from 'react';

import cls from './HighlightText.module.scss';

interface PropsI {
  search: string;
  value: string;
}

export const HighlightText: React.FC<PropsI> = ({ search, value }) => {
  const s = useMemo<string>(() => search.toLocaleLowerCase(), [search]);
  const v = useMemo<string>(() => value.toLocaleLowerCase(), [value]);
  const sIndex = useMemo<number>(() => v.indexOf(s), [s, v]);

  if (sIndex === -1) {
    return <p className={cls.value}>{value}</p>;
  }

  return (
    <p className={cls.value}>
      <span>{value.substring(0, sIndex)}</span>
      <span className={cls.highlight}>
        {value.substring(sIndex, sIndex + s.length)}
      </span>
      <span>{value.substring(sIndex + s.length)}</span>
    </p>
  );
};
