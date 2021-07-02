import React from 'react';

import { LibraryContext, libraryStore } from '@/store/library';

import { EditMaterialPage as Page } from '@/components/Library/EditMaterialPage/EditMaterialPage';

const EditMaterialPage: React.FC = () => {
  return (
    <LibraryContext.Provider value={libraryStore}>
      <Page />
    </LibraryContext.Provider>
  );
};

export default EditMaterialPage;
