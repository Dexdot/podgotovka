import React from 'react';
import { withLayout } from '@moxy/next-layout';
import { AppLayout } from '@/components/layouts/AppLayout/AppLayout';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

const Index: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <ButtonLink href="/signin">Авторизация</ButtonLink>
      <div style={{ height: '25px' }} />
      <ButtonLink href="/app/subjects">Предметы</ButtonLink>
      <br />
      <ButtonLink href="/app/subjects/1/courses">
        Курсы предмета с ID 1
      </ButtonLink>
    </div>
  );
};

export default withLayout(<AppLayout />)(Index);
