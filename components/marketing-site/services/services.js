import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import {Agileinfo, OverView, MainServices}  from '@/marketingSite/services/component';
import {Banner} from "@/marketingSite/common";

const  Service = () => {
  return (
    <MarketingTemplate title="Services">
      <Banner/>
      <Agileinfo />
      <OverView />
      <MainServices/>
    </MarketingTemplate>
  );
};

export default Service;