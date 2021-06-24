import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { AppLayout } from '@/components/layouts/AppLayout/AppLayout';
import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { useDomain } from '@/hooks/useDomain';

const Index: React.FC = () => {
  const { isAdmin, isSchool } = useDomain();

  console.log('isAdmin', isAdmin);
  console.log('isSchool', isSchool);

  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <ButtonLink href="/signin">Авторизация</ButtonLink>
      <div style={{ height: '25px' }} />
      <ButtonLink href="/app/subjects">Предметы</ButtonLink>
    </div>
  );
};

export default withLayout(<AppLayout />)(Index);
