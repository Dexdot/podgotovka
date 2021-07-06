import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { AuthContext } from '@/store/auth';

import cls from './Sidebar.module.scss';
import { SidebarNav } from './SidebarNav/SidebarNav';
import { StudentSidebarNav } from './SidebarNav/StudentSidebarNav';

export const Sidebar: React.FC = observer(() => {
  const { isStudent } = useContext(AuthContext);

  return (
    <aside className={cls.root}>
      {isStudent ? <StudentSidebarNav /> : <SidebarNav />}
    </aside>
  );
});
