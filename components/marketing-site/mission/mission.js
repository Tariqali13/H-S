import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { MissionDetail } from "@/marketingSite/mission/components";
import {Banner, Booking, Stats} from "@/marketingSite/common";

const  Mission = () => {
  return (
    <MarketingTemplate title="About">
      <Banner/>
      <MissionDetail />
      <Stats />
      <Booking />
    </MarketingTemplate>
  );
};

export default Mission;