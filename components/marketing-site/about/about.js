import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import {AboutMe,Team } from "@/marketingSite/about/components";
import { Banner, Stats } from "@/marketingSite/common";

const  About = () => {
    return (
        <MarketingTemplate>
            <Banner/>
            <AboutMe />
            <Stats />
            <Team />
        </MarketingTemplate>

    );
};

export default About;