import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';
import { Signup } from '@/components/Auth/Signup/Signup';

const SignupPage: React.FC = () => {
  return <Signup />;
};

export default withLayout(<BaseLayout />)(SignupPage);
