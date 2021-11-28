import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import {Contacts }  from '@/marketingSite/contact/components';
import {Banner} from "@/marketingSite/common";

const  Products = () => {
  return (
    <MarketingTemplate>
      <Banner/>
      <Contacts />
    </MarketingTemplate>
  );
};

export default Products;