import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { getDDMMYY } from '@/utils/date';
import { showAlert } from '@/utils/network';

import { Avatar } from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/common/Button/Button';

import { CopyIcon, EditIcon } from '../Icons';
import { TODO_MATERIAL_AUTHOR } from '../helpers';

import cls from './Material.module.scss';

interface PropsI {
  materialId: number;
}

export const Header: React.FC<PropsI> = ({ materialId }) => {
  const router = useRouter();

  const handleCopy = useCallback(() => {
    showAlert({ text: 'todo копия' });
  }, []);

  const handleEdit = useCallback(() => {
    router.push(`/library/${materialId}/edit`);
  }, [router, materialId]);

  return (
    <div className={cls.header}>
      <div className={cls.user_info}>
        <div className={cls.avatar}>
          <Avatar
            href={TODO_MATERIAL_AUTHOR.photo_link}
            user={TODO_MATERIAL_AUTHOR}
            size={36}
          />
        </div>
        <div>
          <p className={cls.user_name}>{TODO_MATERIAL_AUTHOR.name}</p>
          <p className={cls.date}>
            Создан {getDDMMYY(new Date(TODO_MATERIAL_AUTHOR.created_at * 1000))}
          </p>
        </div>
      </div>
      <div className={cls.header_btns}>
        <Button variant="grey" onClick={handleCopy}>
          <CopyIcon />
          Создать копию
        </Button>
        <Button variant="grey" onClick={handleEdit}>
          <EditIcon />
          Изменить
        </Button>
      </div>
    </div>
  );
};
