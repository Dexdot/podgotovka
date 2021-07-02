import React, { useContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { SearchParamsI, UserDetailsI } from '@/types/users';

import { useSubjects } from '@/api/hooks/subjects/useSubjects';

import { UsersContext } from '@/store/users';

import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';

import { statuses, roles, anySubject } from './helpers';
import cls from './Users.module.scss';

export const Search: React.FC = () => {
  const { fetchUsers, updateUserDetails } = useContext(UsersContext);

  const subjects = useSubjects();

  const subjectOptions = useMemo<DropdownType[]>(() => {
    if (subjects) {
      const arr = subjects.map((item) => ({
        id: String(item.id),
        text: item.name
      }));
      return [anySubject, ...arr];
    }
    return [];
  }, [subjects]);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState<DropdownType | null>(null);
  const [subject, setSubject] = useState<DropdownType | null>(null);
  const [role, setRole] = useState<DropdownType | null>(null);

  const searchParams = useMemo<SearchParamsI>(
    () => ({
      name_like: debouncedSearch,
      is_active: status && status.id ? JSON.parse(status.id) : undefined,
      subject_id: subject && subject.id ? Number(subject.id) : undefined,
      role: role && role.id ? role.id : undefined
    }),
    [debouncedSearch, status, subject, role]
  );

  useEffect(() => {
    fetchUsers(searchParams);
  }, [searchParams, fetchUsers]);

  useEffect(() => {
    updateUserDetails({} as UserDetailsI);
  }, [updateUserDetails]);

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
