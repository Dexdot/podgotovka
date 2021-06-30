import React from 'react';

import { SubjectI } from '@/types/subjects';

import { MaterialI } from '../helpers';

import cls from './SearchResults.module.scss';

interface PropsI {
  href: string;
  material: MaterialI;
  subject: SubjectI | null;
}

export const SearchResultsLink = React.forwardRef(
  ({ href, material, subject }: PropsI, ref: any) => {
    return (
      <a href={href} ref={ref}>
        <div>
          <p className={cls.material_card_link_name}>{material.name}</p>
          <p className={cls.material_card_link_desc}>{material.description}</p>
          <p className={cls.material_card_link_subject}>{subject?.name}</p>
        </div>
      </a>
    );
  }
);
