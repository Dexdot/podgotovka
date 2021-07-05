import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { LayoutTree } from '@moxy/next-layout';

import '@/styles/index.scss';

import { SidebarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout';
import { StoreRoot } from '@/store/StoreRoot';
import { HandleAuth } from '@/components/HandleAuth';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Подготовка</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <StoreRoot>
        <HandleAuth>
          <LayoutTree
            defaultLayout={<SidebarLayout />}
            Component={Component}
            pageProps={pageProps}
          />
        </HandleAuth>
      </StoreRoot>
    </>
  );
}

export default MyApp;
