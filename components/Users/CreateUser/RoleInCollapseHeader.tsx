import React from 'react';

import { UserIcon } from '../Icons';

import { roles } from '../helpers';
import cls from './CreateUser.module.scss';

interface PropsI {
  role: string;
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
