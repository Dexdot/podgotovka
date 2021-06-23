import React from 'react';
import { observer } from 'mobx-react-lite';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useApp } from '@/hooks/useApp';
import initNprogress from '@/utils/nprogress';

import cls from './AppLayout.module.scss';

initNprogress();

type Props = {
  children?: React.ReactNode;
};

export const AppLayout: React.FC<Props> = observer(({ children }) => {
  useApp();

  return (
    <div className={cls.root}>
      {children}

      <ToastContainer transition={Slide} />
    </div>
  );
});
