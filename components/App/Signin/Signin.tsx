import React from 'react';
import Link from 'next/link';

import { HeaderLogo } from '@/components/layouts/SidebarLayout/Header/HeaderLogo';
import { authApp } from '@/api/common/auth';

import cls from './Signin.module.scss';
import { SigninForm } from './SigninForm';
import { FormI } from './helpers';

// Not student signin
export const Signin: React.FC = () => {
  const submit = (f: FormI) => {
    return authApp(f);
  };

  return (
    <section className={cls.root}>
      <div className="container">
        <div className={cls.logo}>
          <Link href="/">
            <a href="/">
              <HeaderLogo />
            </a>
          </Link>
        </div>

        <SigninForm onSubmit={submit} />
      </div>
    </section>
  );
};
