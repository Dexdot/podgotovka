import React from 'react';
import { withLayout } from '@moxy/next-layout';

import { LibraryLayout } from '@/components/layouts/LibraryLayout/LibraryLayout';
import { SearchPage } from '@/components/Library/SearchPage/SearchPage';
import { SidebarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout';

export default withLayout(
  <SidebarLayout>
    <LibraryLayout />
  </SidebarLayout>
)(SearchPage);
