import React, {useEffect, useState} from 'react';
import {Footer, Header} from './components';
import Router from 'next/router';
import Head from "next/head";

type Props = {
    children: any,
}

const MarketingTemplate = (props: Props) => {
    const {children} = props;
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
            <Head>
                <link
                    href="//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese"
                    rel="stylesheet"/>
                <link href="//fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
                <link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all"/>
                <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all"/>
                <link href="/css/style.css" rel="stylesheet" type="text/css" media="all"/>
                <link href="/css/skdslider.css" rel="stylesheet"/>
                <script src="/js/skdslider.min.js"/>
            </Head>
        <div className="page">
            <Header/>
            {children}
            <Footer/>
        </div>
            </>
    );
};

export default MarketingTemplate;