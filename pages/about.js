import React from 'react';
import About from '@/marketingSite/about';
import {baseURL} from "@/constants/env";
import {http_req} from "@/utils/http";

const AboutMain = props => {
  return (
    <About {...props} />
  );
};

export async function getServerSideProps() {
  const aboutRes = await http_req(
    baseURL + `/v1/about`,
    'get',
  );
  const aboutResponse = aboutRes?.data;
  return {
    props: {
      allRes: {
        aboutRes: aboutResponse,
      },
    },
  };
};

export default AboutMain;