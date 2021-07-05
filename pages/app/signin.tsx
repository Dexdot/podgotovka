import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { AppLayout } from '@/components/layouts/AppLayout/AppLayout';
import { Signin } from '@/components/App/Signin/Signin';

const SigninPage: React.FC = () => {
  return <Signin />;
};

export default withLayout(<AppLayout />)(SigninPage);
