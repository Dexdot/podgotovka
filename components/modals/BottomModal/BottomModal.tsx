import React from 'react';
import cn from 'classnames';

import {
  CommonModal,
  CommonModalProps
} from '@/components/modals/CommonModal/CommonModal';
import cls from './BottomModal.module.scss';

export function BottomModal({
  containerClass,
  children,
  ...rest
}: CommonModalProps): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CommonModal containerClass={cn(cls.container, containerClass)} {...rest}>
      {children}
    </CommonModal>
  );
}
