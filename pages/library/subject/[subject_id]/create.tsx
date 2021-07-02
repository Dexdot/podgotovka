import React from 'react';

import { LibraryContext, libraryStore } from '@/store/library';

import { EditMaterialPage } from '@/components/Library/EditMaterialPage/EditMaterialPage';

const CreateMaterialPage: React.FC = () => {
  return (
    <LibraryContext.Provider value={libraryStore}>
      <EditMaterialPage />
    </LibraryContext.Provider>
  );
};

export default CreateMaterialPage;
