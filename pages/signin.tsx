import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';
import { Signin } from '@/components/Auth/Signin/Signin';

const SigninPage: React.FC = () => {
  return <Signin />;
};

export default withLayout(<BaseLayout />)(SigninPage);
