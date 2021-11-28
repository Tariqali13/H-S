import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { ProductsMine }  from '@/marketingSite/products/components';
import {Banner, Booking} from "@/marketingSite/common";

const Products = props => {
  return (
    <MarketingTemplate>
      <Banner/>
      <ProductsMine {...props} />
      <Booking />
    </MarketingTemplate>
  );
};

export default Products;