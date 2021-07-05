import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { LibraryContext } from '@/store/library';

import { getDDMMYY } from '@/utils/date';

import { Dropdown, DropdownType } from '@/components/common/Dropdown/Dropdown';
import { Button } from '@/components/common/Button/Button';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { TextareaFlat } from '@/components/common/Textarea/TextareaFlat';
import {
  getStatusColor,
  moreOpitons,
  statusOptions,
  STATUS_DRAFT,
  STATUS_PUBLISHED
} from '../helpers';

import cls from '../Material.module.scss';

interface PropsI {
  onMoreClick: (value: DropdownType) => void;
  onStatusChange: () => void;
  onSave: () => void;
}

export const HeaderEdit: React.FC<PropsI> = observer(
  ({ onMoreClick, onStatusChange, onSave }) => {
    const { material, laodingMaterial, updateMaterialName } =
      useContext(LibraryContext);

    const statusValue = useMemo<DropdownType | null>(() => {
      if (material.is_published) {
        return (
          statusOptions.find((item) => item.id === STATUS_PUBLISHED) || null
        );
      }
      return statusOptions.find((item) => item.id === STATUS_DRAFT) || null;
    }, [material]);

    const statusColor = useMemo(() => {
      const statusID = statusValue?.id;
      return getStatusColor(statusID);
    }, [statusValue]);

    return (
      <div className={cls.header_edit}>
        <div className={cls.header_btns}>
          <Dropdown
            items={moreOpitons}
            value={null}
            placeholder="Еще"
            onChange={onMoreClick}
            disabled={laodingMaterial === 'loading'}
          />
          <Dropdown
            items={statusOptions}
            value={statusValue}
            placeholder="Статус"
            beforeText={
              <span
                style={{ background: statusColor }}
                className={cls.status_dot}
              />
            }
            onChange={onStatusChange}
            disabled={laodingMaterial === 'loading'}
          />
          <Button onClick={onSave} disabled={laodingMaterial === 'loading'}>
            Сохранить
          </Button>
        </div>
        <TextareaFlat
          value={material.name}
          onChange={(e) => updateMaterialName(e.currentTarget.value)}
          initialHeight={38}
        />
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
      </div>
    );
  }
);
