import React from 'react';
import Home from '@/marketingSite/home';
import {http_req} from "@/utils/http";
import {baseURL} from "@/constants/env";

const Main = props => {
  return (
    <Home {...props} />
  );
};

export async function getServerSideProps() {
  const testimonialRes = await http_req(
    // eslint-disable-next-line max-len
    baseURL + `/v1/testimonial/all-testimonials`,
    'get',
  );
  const productsRes = await http_req(
    // eslint-disable-next-line max-len
    baseURL + `/v1/product/all-products?page_no=1&records_per_page=2&type=recent_work`,
    'get',
  );
  const productsResp = productsRes?.data;
  const testimonialsResp = testimonialRes?.data;
  return {
    props: {
      allRes: {
        testimonialsRes: testimonialsResp,
        productsRes: productsResp,
      },
    },
  };
};

export default Main;
