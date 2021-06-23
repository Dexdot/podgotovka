import React from 'react';
import { AuthContext, authStore } from './auth';

type Props = {
  children: React.ReactNode;
};

// Здесь выводим только провайдеры, которые нужны глобально -
// для всего приложения
export const StoreRoot: React.FC<Props> = ({ children }) => {
  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
