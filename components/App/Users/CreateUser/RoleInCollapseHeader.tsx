import React from 'react';

import { RoleType } from '@/types/app/users';
import { UserIcon } from '../Icons';

import { roles } from '../helpers';
import cls from './CreateUser.module.scss';

interface PropsI {
  role: RoleType;
}

export const RoleInCollapseHeader: React.FC<PropsI> = ({ role }) => {
  if (role) {
    const currentRole = roles.find((item) => item.id === role);
    return (
      <div className={cls.collapse_header}>
        <UserIcon />
        <p className={cls.collapse_header_text}>{currentRole?.text}</p>
      </div>
    );
  }

  return null;
};
