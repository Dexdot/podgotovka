/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Collapse } from 'react-collapse';
import cn from 'classnames';

import { ChevronIcon } from './icons';
import cls from './SectionCollapse.module.scss';

type Props = {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
  headerChildren?: React.ReactNode;
};

export const SectionCollapse: React.FC<Props> = ({
  isOpen,
  onClick,
  title,
  children,
  headerChildren
}) => {
  return (
    <section className={cn(cls.root, { [cls.root_open]: isOpen })}>
      <button className={cls.toggle_btn} type="button" onClick={onClick} />
      <header className={cls.header}>
        <b className={cls.title}>
          {title}
          <ChevronIcon />
        </b>

        {headerChildren}
      </header>

      {children && (
        <Collapse isOpened={isOpen}>
          <div className={cls.content}>{children}</div>
        </Collapse>
      )}
    </section>
  );
};
