import React from 'react';

import { HeaderLogo } from '@/components/layouts/SidebarLayout/Header/HeaderLogo';
import cls from '@/components/Auth/Auth.module.scss';
import { AccountsStudentAPI } from '@/api/accounts-student';

import { SignupForm } from './SignupForm';
import { FormI } from './helpers';

export const Signup: React.FC = () => {
  const submit = (f: FormI) => {
    return AccountsStudentAPI.register(f);
  };

  return (
    <section className={cls.root}>
      <div className="container">
        <div className={cls.logo}>
          <HeaderLogo />
        </div>

        <SignupForm onSubmit={submit} />
      </div>
    </section>
  );
};
