import React, {useEffect, useState} from 'react';
import {Footer, Header} from './components';
import Router from 'next/router';
import {FrontendLoader} from "@/components/loaders";
import MarketingHead from './marketing-head';

type Props = {
  children: any,
  title: string,
}

const MarketingTemplate = (props: Props) => {
  const {children, title} = props;
  const [componentMount, setComponentMount] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  Router.onRouteChangeStart = () => {
    setIsRouting(true);
  };
  Router.onRouteChangeComplete = () => {
    setIsRouting(false);
  };
  Router.onRouteChangeError = () => {
    setIsRouting(false);
  };
  useEffect(() => {
    setComponentMount(true);
  }, []);
  return (
    <>
      <MarketingHead title={title}/>
      {(isRouting || !componentMount) && <FrontendLoader/>}
      <div className="page">
        <Header/>
        {children}
        <Footer/>
      </div>
    </>
  );
};

export default MarketingTemplate;