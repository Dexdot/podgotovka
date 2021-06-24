/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { ChevronIcon } from '@/components/common/SectionCollapse/icons';
import cls from './SubjectListItem.module.scss';
import { SubjectIcon } from './Icons';

type Props = {
  title: string;
  subtitle: string;
  onClick: () => void;
};

export const SubjectListItem: React.FC<Props> = ({
  onClick,
  title,
  subtitle
}) => {
  return (
    <div>
      <section className={cls.root}>
        <button className={cls.toggle_btn} type="button" onClick={onClick} />
        <b className={cls.title}>
          <SubjectIcon />
          <div className={cls.text_header}>
            <div className={cls.text_header_title}>{title}</div>
            <div className={cls.text_header_subtitle}>{subtitle}</div>
          </div>
          <div className={cls.chevron_icon}>
            <ChevronIcon />
          </div>
        </b>
      </section>
    </div>
  );
};
