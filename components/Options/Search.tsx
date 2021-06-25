import React, { useContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { OptionsContext } from '@/store/options';

import { useDebounce } from '@/hooks/useDebounce';

import { OPTION_FORMATS } from '@/utils/consts';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import cls from './Options.module.scss';

export const Search: React.FC = observer(() => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [format, setFormat] = useState<DropdownItem | null>(null);

  const { fetchOptions } = useContext(OptionsContext);

  const optionFormats = useMemo<DropdownItem[]>(
    () =>
      OPTION_FORMATS.map((item) => ({
        id: item.id.toString(),
        text: item.name
      })),
    []
  );

  useEffect(() => {
    fetchOptions({
      search: debouncedSearch,
      formatId: format ? Number(format.id) : undefined
    });
  }, [debouncedSearch, format]);

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
          items={optionFormats}
          value={format}
          onChange={setFormat}
          placeholder="Формат"
        />
      </div>
    </div>
  );
});
