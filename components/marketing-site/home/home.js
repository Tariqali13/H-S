import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { Slider } from "./component";
import {SpecializeSection, Clients, Advantage, RecentWork, Testimonials } from "./component";
import { Stats, Booking } from '@/marketingSite/common';

const Home = props => {
  return (
    <MarketingTemplate title="Home">
      <Slider />
      <SpecializeSection />
      <Clients />
      <Advantage />
      <Stats/>
      <RecentWork {...props} />
      <Testimonials {...props} />
      <Booking />
    </MarketingTemplate>
  );
};
export default Home;