import React from 'react';
import cn from 'classnames';

import { Button } from '@/components/common/Button/Button';
import {
  CommonModal,
  CommonModalProps
} from '@/components/modals/CommonModal/CommonModal';
import cls from './ConfirmModal.module.scss';

interface PropsI extends CommonModalProps {
  title: string;
  text?: string;
  confirmText: string;
  cancelText: string;
  onButtonClick: (confirmed: boolean) => void;
}

export function ConfirmModal({
  isOpen,
  close,
  rootClass,
  containerClass,
  title,
  text,
  confirmText,
  cancelText,
  onButtonClick
}: PropsI): JSX.Element {
  return (
    <CommonModal
      isOpen={isOpen}
      close={close}
      rootClass={rootClass}
      containerClass={cn(containerClass, cls.container)}
    >
      <h2 className={cls.title}>{title}</h2>
      {text && <p className={cls.text}>{text}</p>}
      <div className={cls.buttons}>
        <Button variant="secondary" onClick={() => onButtonClick(false)}>
          {cancelText}
        </Button>
        <Button onClick={() => onButtonClick(true)}>{confirmText}</Button>
      </div>
    </CommonModal>
  );
}

ConfirmModal.displayName = 'ConfirmModal';
ConfirmModal.defaultProps = {
  text: ''
};
