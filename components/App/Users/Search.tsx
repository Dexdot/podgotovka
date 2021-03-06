import React, { useContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { RoleType, SearchParamsI, UserDetailsI } from '@/types/app/users';

import { useSubjects } from '@/api/app/hooks/subjects/useSubjects';

import { UsersContext } from '@/store/app/users';

import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';

import { statuses, roles, anySubject, anyStatus, anyRole } from './helpers';
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
      return arr;
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
      role: role && role.id ? (role.id as RoleType) : undefined
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
          placeholder="??????????"
          search
        />
      </div>

      <div className={cn(cls.input)}>
        <Dropdown
          items={[anyStatus, ...statuses]}
          value={status}
          onChange={setStatus}
          placeholder="????????????"
        />
      </div>
      <div className={cn(cls.input)}>
        <Dropdown
          items={[anySubject, ...subjectOptions]}
          value={subject}
          onChange={setSubject}
          placeholder="??????????????"
        />
      </div>
      <div className={cn(cls.input)}>
        <Dropdown
          items={[anyRole, ...roles]}
          value={role}
          onChange={setRole}
          placeholder="????????"
        />
      </div>
    </div>
  );
};
