/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import Link from 'next/link';

import { ChevronIcon } from '@/components/common/SectionCollapse/icons';
import cls from './SubjectListItem.module.scss';
import { SubjectIcon } from './Icons';

type SubjectData = {
  id: number;
  name: string;
  direction: string;
  color: string;
};

type Props = {
  subject: SubjectData;
};

export const SubjectListItem: React.FC<Props> = ({ subject }) => {
  const { id, name, direction, color } = subject;

  return (
    <div>
      <section className={cls.root}>
        <Link href={`/app/subjects/${id}`}>
          <a href={`/app/subjects/${id}`} className={cls.toggle_btn} />
        </Link>

        <b className={cls.title}>
          <div style={{ color }}>
            <SubjectIcon />
          </div>

          <div className={cls.text_header}>
            <div className={cls.text_header_title}>{name}</div>
            <div className={cls.text_header_subtitle}>{direction}</div>
          </div>

          <div className={cls.chevron_icon}>
            <ChevronIcon />
          </div>
        </b>
      </section>
    </div>
  );
};
