import React from 'react';
import { withLayout } from '@moxy/next-layout';

import { LibraryLayout } from '@/components/layouts/LibraryLayout/LibraryLayout';
import { LibraryPage } from '@/components/Library/LibraryPage';
import { SidebarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout';

export default withLayout(
  <SidebarLayout>
    <LibraryLayout />
  </SidebarLayout>
)(LibraryPage);
