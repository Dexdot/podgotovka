import React from 'react';

import { useRoles } from '@/api/hooks/useRoles';

import { UserIcon } from './Icons';

import cls from './User.module.scss';

interface PropsI {
  roleId: string;
}

export const RoleInCollapseHeader: React.FC<PropsI> = ({ roleId }) => {
  const [roles] = useRoles();

  if (roleId) {
    return (
      <div className={cls.collapse_header}>
        <UserIcon />
        <p className={cls.collapse_header_text}>
          {roles.find((item) => item.id === roleId)?.text}
        </p>
      </div>
    );
  }

  return null;
};
