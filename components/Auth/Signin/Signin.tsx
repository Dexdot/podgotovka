import React from 'react';

import { HeaderLogo } from '@/components/layouts/SidebarLayout/Header/HeaderLogo';
import cls from '@/components/Auth/Auth.module.scss';
import { AccountsStudentAPI } from '@/api/accounts-student';

import { SigninForm } from './SigninForm';
import { FormI } from './helpers';

export const Signin: React.FC = () => {
  const submit = (f: FormI) => {
    return AccountsStudentAPI.auth(f);
  };

  return (
    <section className={cls.root}>
      <div className="container">
        <div className={cls.logo}>
          <HeaderLogo />
        </div>

        <SigninForm onSubmit={submit} />
      </div>
    </section>
  );
};
