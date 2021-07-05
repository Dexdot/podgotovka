import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';
import { Redirect } from '@/components/Redirect';

import { authStore } from '@/store/auth';
import cls from './SidebarLayout.module.scss';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

type Props = {
  children?: React.ReactNode;
};

export const SidebarLayout: React.FC<Props> = observer(({ children }) => {
  const { pathname } = useRouter();
  const { state: authState, isStudent } = authStore;

  const isInitial = authState === 'initial';
  const isAuthed = authState === 'authed';
  const isAppRoute = pathname.startsWith('/app');

  const studentWannaApp = isStudent && isAppRoute;

  return (
    <BaseLayout>
      {!isInitial && (
        <>
          {isAuthed ? (
            <>
              <Header />

              <div className={cls.page}>
                <Sidebar />
                <main className={cls.content}>
                  <div className="container">
                    {studentWannaApp ? <Redirect href="/" /> : children}
                  </div>
                </main>
              </div>
            </>
          ) : (
            <Redirect href="/signin" />
          )}
        </>
      )}
    </BaseLayout>
  );
});
