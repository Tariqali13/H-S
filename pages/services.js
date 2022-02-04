import React from 'react';
import Products from '@/marketingSite/products';
import {http_req} from "@/utils/http";
import {baseURL} from "@/constants/env";

const ProductsMain = props => {
  return (
    <Products {...props} />
  );
};

export async function getServerSideProps() {
  const productsRes = await http_req(
    // eslint-disable-next-line max-len
    baseURL + `/v1/product/all-products?page_no=1&records_per_page=2&type=service`,
    'get',
  );
  const productsResp = productsRes?.data;
  return {
    props: {
      allRes: {
        productsRes: productsResp,
      },
    },
  };
};

export default ProductsMain;