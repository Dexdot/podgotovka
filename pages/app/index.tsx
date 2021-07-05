import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

const Index: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <ButtonLink href="/app/signin">Авторизация</ButtonLink>
    </div>
  );
};

export default withLayout(<BaseLayout />)(Index);
