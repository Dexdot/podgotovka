import React, { useContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { UsersContext } from '@/store/users';

import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import { statuses, roles } from './helpers';
import cls from './Users.module.scss';

export const Search: React.FC = () => {
  const { fetchUsers } = useContext(UsersContext);

  const subjects = useSubjects();

  const subjectOptions = useMemo<DropdownItem[]>(() => {
    if (subjects) {
      return subjects.map((item) => ({
        id: item.id.toString(),
        text: item.name
      }));
    }
    return [];
  }, [subjects]);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState<DropdownItem | null>(null);
  const [subject, setSubject] = useState<DropdownItem | null>(null);
  const [role, setRole] = useState<DropdownItem | null>(null);

  useEffect(() => {
    fetchUsers({
      name_like: debouncedSearch,
      is_active: status ? JSON.parse(status.id) : undefined,
      subject_id: subject ? Number(subject.id) : undefined,
      role: role?.id
    });
  }, [debouncedSearch, status, subject, role]);

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
          items={statuses}
          value={status}
          onChange={setStatus}
          placeholder="Статус"
        />
      </div>
      <div className={cn(cls.input)}>
        <Dropdown
          items={subjectOptions}
          value={subject}
          onChange={setSubject}
          placeholder="Предмет"
        />
      </div>
      <div className={cn(cls.input)}>
        <Dropdown
          items={roles}
          value={role}
          onChange={setRole}
          placeholder="Роль"
        />
      </div>
    </div>
  );
};
