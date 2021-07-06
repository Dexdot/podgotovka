import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { LibraryContext } from '@/store/library';
import { authStore } from '@/store/auth';

import { getDDMMYY } from '@/utils/date';

import { Avatar } from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/common/Button/Button';
import { ButtonLink } from '@/components/common/Button/ButtonLink';

import { CopyIcon, EditIcon } from '../../Icons';

import cls from '../Material.module.scss';

interface PropsI {
  subjectId: number;
  onCopy: () => void;
}

export const HeaderReadOnly: React.FC<PropsI> = observer(
  ({ subjectId, onCopy }) => {
    const { material, loadingMaterial } = useContext(LibraryContext);
    const { isStudent, state: authState } = authStore;

    return (
      <>
        <div className={cls.user_info}>
          <div className={cls.avatar}>
            <Avatar
              href={material.author?.photo_link}
              user={material.author}
              size={36}
            />
          </div>
          <div>
            <p className={cls.user_name}>{material.author?.name}</p>
            {material.created_at && (
              <p className={cls.date}>
                Создан {getDDMMYY(new Date(material.created_at * 1000))}
              </p>
            )}
          </div>
        </div>
        {authState !== 'initial' && !isStudent && (
          <div className={cls.header_btns}>
            <Button
              variant="grey"
              onClick={onCopy}
              loading={loadingMaterial === 'loading'}
            >
              <CopyIcon />
              Создать копию
            </Button>
            <ButtonLink
              variant="grey"
              href={`/app/library/subject/${subjectId}/material/${material.id}/edit`}
              loading={loadingMaterial === 'loading'}
            >
              <EditIcon />
              Изменить
            </ButtonLink>
          </div>
        )}
      </>
    );
  }
);
