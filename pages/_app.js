import React from 'react';
import '../styles/carousel.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
const queryClient = new QueryClient();
import { VerifyUserToken } from '@/utils/verify-token';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type Props = {
  Component: any,
  pageProps: any,
};

function MyApp(props: Props) {
  const { Component, pageProps } = props;
  VerifyUserToken();
  return (
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
        <ToastContainer autoClose={2000} />
      </React.Fragment>
  );
}
export default MyApp;