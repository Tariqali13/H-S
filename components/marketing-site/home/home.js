import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { Slider } from "./component";
import {SpecializeSection, Clients,Advantage,RecentWork } from "./component";
import { Stats } from '@/marketingSite/common';

const Home = () => {
    return (
        <MarketingTemplate>
            <Slider />
            <SpecializeSection />
            <Clients />
            <Advantage />
            <Stats/>
            <RecentWork />
        </MarketingTemplate>
    );
};
export default Home;