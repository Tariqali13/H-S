import React from 'react';

type Props = {
  Component: any,
  pageProps: any,
};

function MyApp(props: Props) {
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
export default MyApp;
