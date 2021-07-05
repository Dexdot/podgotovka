import React from 'react';
import { withLayout } from '@moxy/next-layout';

import { LibraryLayout } from '@/components/layouts/LibraryLayout/LibraryLayout';
import { ViewMaterialPage } from '@/components/Library/ViewMaterialPage/ViewMaterialPage';
import { SidebarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout';

export default withLayout(
  <SidebarLayout>
    <LibraryLayout />
  </SidebarLayout>
)(ViewMaterialPage);
