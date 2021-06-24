/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import cls from './CommonModal.module.scss';
import { scroll } from './scroll';

export type CommonModalProps = {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
  rootClass?: string;
  containerClass?: string;
};

export const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  close,
  children,
  rootClass,
  containerClass
}) => {
  const root = useMemo(
    () => document.querySelector('#modal-root') as Element,
    []
  );

  const [waitAnimation, setWaitAnimation] = useState<boolean>(isOpen);

  useEffect(() => {
    let timer = 0;

    if (!isOpen) {
      timer = window.setTimeout(() => {
        setWaitAnimation(false);
      }, 300);
    } else {
      timer = window.setTimeout(() => {
        setWaitAnimation(true);
      }, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scroll.disable();
    } else {
      scroll.enable();
    }

    return () => {
      scroll.enable();
    };
  }, [isOpen]);

  return isOpen || waitAnimation
    ? createPortal(
        <section
          className={cn(cls.root, rootClass)}
          data-open={isOpen ? waitAnimation : isOpen}
        >
          <button className={cls.backdrop} type="button" onClick={close} />
          <div className={cn(cls.container, containerClass)}>{children}</div>
        </section>,
        root
      )
    : null;
};

CommonModal.displayName = 'CommonModal';
CommonModal.defaultProps = {
  children: '',
  rootClass: '',
  containerClass: ''
};
