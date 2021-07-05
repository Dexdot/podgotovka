import React from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useApp } from '@/hooks/useApp';
import initNprogress from '@/utils/nprogress';

import cls from './BaseLayout.module.scss';

initNprogress();

type Props = {
  children?: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children }) => {
  useApp();

  return (
    <div className={cls.root}>
      {children}
      <ToastContainer transition={Slide} />
      <div id="modal-root" />
    </div>
  );
};
