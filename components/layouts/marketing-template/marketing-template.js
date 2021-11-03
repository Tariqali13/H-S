import React, {useEffect, useState} from 'react';
import {Footer, Header} from './components';
import Router from 'next/router';

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
        <div className="page">
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default MarketingTemplate;