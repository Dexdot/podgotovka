import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { LibraryContext } from '@/store/library';

import { Dropdown, DropdownItem } from '@/components/common/Dropdown/Dropdown';
import { Button } from '@/components/common/Button/Button';

import {
  moreOpitons,
  statusOptions,
  STATUS_DRAFT,
  STATUS_PUBLISHED
} from '../helpers';

import cls from '../Material.module.scss';

interface PropsI {
  onMoreClick: (value: DropdownItem) => void;
  onStatusChange: () => void;
}

export const HeaderEdit: React.FC<PropsI> = observer(
  ({ onMoreClick, onStatusChange }) => {
    const { material, laodingMaterial } = useContext(LibraryContext);

    const statusValue = useMemo<DropdownItem | null>(() => {
      if (material.is_published) {
        return (
          statusOptions.find((item) => item.id === STATUS_PUBLISHED) || null
        );
      }
      return statusOptions.find((item) => item.id === STATUS_DRAFT) || null;
    }, [material]);

    return (
      <div className={cls.header_edit}>
        <div>
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
            onChange={onStatusChange}
            disabled={laodingMaterial === 'loading'}
          />
          <Button disabled={laodingMaterial === 'loading'}>Сохранить</Button>
        </div>
      </div>
    );
  }
);
