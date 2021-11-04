import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { Slider } from "./component";
import {SpecializeSection, Clients,Advantage,Stats } from "./component";

const Home = () => {
    return (
        <MarketingTemplate>
            <Slider />
            <SpecializeSection />
            <Clients />
            <Advantage />
            <Stats />
        </MarketingTemplate>
    );
};
export default Home;