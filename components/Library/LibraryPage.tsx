import React from 'react';

import { LibraryLayoutPropsI } from '@/components/layouts/LibraryLayout/helpers';

import { Categories } from './Categories/CategoriesSimple';
import { SearchResults } from './SearchResults/SearchResults';

export const LibraryPage: React.FC<LibraryLayoutPropsI> = ({
  search,
  isSubmitted,
  subject,
  subjects
}) => {
  return (
    <>
      {!isSubmitted && <Categories subject={subject} />}
      {isSubmitted && <SearchResults search={search} subjects={subjects} />}
    </>
  );
};
