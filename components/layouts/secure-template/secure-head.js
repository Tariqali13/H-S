import React from 'react';
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";

type Props = {
  title: string,
};

const SecureHead = (props: Props) => {
  const { title } = props;
  return (
    <Head>
      <title>{title ? `${title} | ` : ''}The beautiful birth</title>
      <link
        /* eslint-disable-next-line max-len */
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <link  rel="stylesheet" href="/admin-css/admin.css"/>
      <link  rel="stylesheet" href="/plugins/nucleo/css/nucleo.css"/>
      <link rel="apple-touch-icon"
        sizes="180x180" href="/images/apple-touch-icon.png"/>
      <link rel="icon" type="image/png"
        sizes="32x32" href="/images/favicon-32x32.png"/>
      <link rel="icon" type="image/png"
        sizes="16x16" href="/images/favicon-16x16.png"/>
      <link rel="manifest" href="/images/site.webmanifest"/>
      <link rel="mask-icon"
        href="/images/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/>
    </Head>
  );
};

export { SecureHead };