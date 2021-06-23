import React from 'react';

import cls from './Sidebar.module.scss';
import { SidebarNav } from './SidebarNav/SidebarNav';

export const Sidebar: React.FC = () => {
  return (
    <aside className={cls.root}>
      <SidebarNav />
    </aside>
  );
};
