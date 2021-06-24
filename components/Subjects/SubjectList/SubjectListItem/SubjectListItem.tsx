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
    <div className={cls.root}>
      <section>
        <Link href={`/app/subjects/${id}`}>
          <a href={`/app/subjects/${id}`} className={cls.link} />
        </Link>

        <div className={cls.inner}>
          <div style={{ color }}>
            <SubjectIcon />
          </div>

          <div className={cls.text_header}>
            <p className={cls.text_header_title}>{name}</p>
            <p className={cls.text_header_subtitle}>{direction}</p>
          </div>

          <div className={cls.chevron_icon}>
            <ChevronIcon />
          </div>
        </div>
      </section>
    </div>
  );
};
