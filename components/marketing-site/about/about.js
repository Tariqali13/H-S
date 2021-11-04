import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import {AboutMe,Stats,Team } from "@/marketingSite/about/components";
import { Banner } from "@/marketingSite/common";

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