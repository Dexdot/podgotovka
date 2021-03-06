import React from 'react';

import { HeaderLogo } from '@/components/layouts/SidebarLayout/Header/HeaderLogo';
import { authApp } from '@/api/app/auth';

import cls from './Signin.module.scss';
import { SigninForm } from './SigninForm';
import { FormI } from './helpers';

export const Signin: React.FC = () => {
  const submit = (f: FormI) => {
    return authApp(f);
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
