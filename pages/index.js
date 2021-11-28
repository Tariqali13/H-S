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
  const testimonialsResp = testimonialRes?.data;
  return {
    props: {
      allRes: {
        testimonialsRes: testimonialsResp,
      },
    },
  };
};

export default Main;
