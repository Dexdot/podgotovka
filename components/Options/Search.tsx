import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { SearchParamsI } from '@/types/options';

import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import { optionTypes } from './helpers';
import cls from './Options.module.scss';

interface PropsI {
  fetch: (params?: SearchParamsI) => Promise<void>;
}

export const Search: React.FC<PropsI> = ({ fetch }) => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [type, setType] = useState<DropdownItem | null>(null);

  useEffect(() => {
    fetch({
      search: debouncedSearch,
      type: type?.id
    });
  }, [debouncedSearch, type]);

  return (
    <div className={cn(cls.filters, cls.flex_center)}>
      <div className={cn(cls.search, cls.input)}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Поиск"
          search
        />
      </div>

      <div className={cn(cls.input)}>
        <Dropdown
          items={optionTypes}
          value={type}
          onChange={setType}
          placeholder="Формат"
        />
      </div>
    </div>
  );
};
