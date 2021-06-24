import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { useUserStatuses } from '@/api/hooks/useUserStatuses';
import { useRoles } from '@/api/hooks/useRoles';
import { useSubjects } from '@/api/hooks/useSubjects';

import { UsersContext } from '@/store/users';

import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '@/components/common/Input/Input';
import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';

import cls from './Users.module.scss';

export const Search: React.FC = () => {
  const { fetchUsers } = useContext(UsersContext);

  const [statuses] = useUserStatuses();
  const [subjects] = useSubjects();
  const [roles] = useRoles();

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState<DropdownItem | null>(null);
  const [subject, setSubject] = useState<DropdownItem | null>(null);
  const [role, setRole] = useState<DropdownItem | null>(null);

  useEffect(() => {
    fetchUsers({
      search,
      statusId: status?.id,
      subjectId: subject?.id,
      roleId: role?.id
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
          items={subjects}
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
