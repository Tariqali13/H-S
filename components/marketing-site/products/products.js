import React from 'react';
import MarketingTemplate from '@/layouts/marketing-template';
import { ProductsMine }  from '@/marketingSite/products/components';
import {Banner} from "@/marketingSite/common";

const  Products = () => {
    return (
        <MarketingTemplate>
            <Banner/>
            <ProductsMine />
        </MarketingTemplate>

    );
};

export default Products;