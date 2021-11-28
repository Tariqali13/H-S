import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { Slider } from "./component";
import {SpecializeSection, Clients,Advantage,RecentWork, Testimonials } from "./component";
import { Stats } from '@/marketingSite/common';

const Home = props => {
    return (
        <MarketingTemplate>
            <Slider />
            <SpecializeSection />
            <Clients />
            <Advantage />
            <Stats/>
            <RecentWork />
            <Testimonials {...props} />
        </MarketingTemplate>
    );
};
export default Home;