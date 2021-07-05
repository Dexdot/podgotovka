import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';

const Signin: React.FC = () => {
  return <div>Student signin</div>;
};

export default withLayout(<BaseLayout />)(Signin);
