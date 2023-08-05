import { type ReactElement, type ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import MainLayout from '@/layouts/MainLayout';
import { AnimatePresence } from 'framer-motion';
import Root from '@/providers/Root';
import '@/styles/global.scss';
import { useRouter } from 'next/router';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function Listella({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  return (
    <Root>
      <MainLayout>
        <AnimatePresence initial={false}>
          <Component {...pageProps } key={router.asPath} />
        </AnimatePresence>
      </MainLayout>
    </Root>
  );
}
