import React from 'react';
import { AppLayout } from '@/components/layouts/AppLayout/AppLayout';

import cls from './SidebarLayout.module.scss';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

type Props = {
  children?: React.ReactNode;
};

export const SidebarLayout: React.FC<Props> = ({ children }) => {
  return (
    <AppLayout>
      <Header />

      <div className={cls.page}>
        <Sidebar />
        <main className={cls.content}>
          <div className="container">{children}</div>
        </main>
      </div>
    </AppLayout>
  );
};
