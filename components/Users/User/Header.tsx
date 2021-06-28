import React, { useMemo } from 'react';

import { UserDetailsI } from '@/types/users';

import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';
import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { Crumbs } from '@/components/common/Crumbs/Crumbs';

import { statuses } from '../helpers';

import cls from './User.module.scss';

interface PropsI {
  details: UserDetailsI;
  onStatusChange: (newStatus: boolean) => void;
}

export const Header: React.FC<PropsI> = ({ details, onStatusChange }) => {
  const selectedStatus = useMemo<DropdownItem | null>(() => {
    if (details.id) {
      return (
        statuses.find((item) => item.id === details.is_active.toString()) ||
        null
      );
    }
    return null;
  }, [details]);

  return (
    <>
      <Crumbs
        items={[
          { text: 'Пользователи', to: '/app/users' },
          { text: details.name, to: '' }
        ]}
      />

      <header>
        <div className={cls.details}>
          <Avatar
            href={details.photo_link}
            size={72}
            user={{ name: details.name || '' }}
          />
          <div className={cls.user}>
            <h1 className={cls.user_name}>{details.name}</h1>
            {details.id && (
              <p className={cls.user_info}>
                <span>{details.login}</span>
                <span>•</span>
                <span>{details.role}</span>
                <span>•</span>
                <span>{details.subject?.name}</span>
              </p>
            )}
          </div>
        </div>
        <div className={cls.header_btns}>
          <Dropdown
            items={statuses}
            value={selectedStatus}
            onChange={(value) => onStatusChange(JSON.parse(value.id))}
            placeholder="Статус"
          />
          <ButtonLink href={`/app/users/${details.id}/edit`}>
            Редактировать
          </ButtonLink>
        </div>
      </header>
    </>
  );
};
