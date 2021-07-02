import React, { useEffect, useState } from 'react';

import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { times } from './helpers';

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export const InputTime: React.FC<Props> = ({ value, onChange }) => {
  const initialValue = times.find((t) => Number(t.id) === value);
  const [time, setTime] = useState(initialValue || times[0]);

  useEffect(() => {
    const min = Number(time.id);
    onChange(min);
  }, [time, onChange]);

  return (
    <Dropdown maxHeight={210} items={times} value={time} onChange={setTime} />
  );
};
