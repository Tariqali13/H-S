import React from 'react';
import Head from "next/head";

type Props = {
  title: string,
}
const MarketingHead = (props: Props) => {
  const { title } = props;
  return (
    <Head>
      <title> {title ? `${title} | ` : ''}H & S</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      <link rel="manifest" href="/images/site.webmanifest"/>
      <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/>
      <link
        href="//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese"
        rel="stylesheet"/>
      <link href="//fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
      <link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all"/>
      <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all"/>
      <link href="/css/style.css" rel="stylesheet" type="text/css" media="all"/>
      {/*<link href="/css/skdslider.css" rel="stylesheet"/>*/}
      {/*<script src="/js/skdslider.min.js"/>*/}
      {/* eslint-disable-next-line max-len */}
      {/*<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"/>*/}
    </Head>
  );
};

export default MarketingHead;