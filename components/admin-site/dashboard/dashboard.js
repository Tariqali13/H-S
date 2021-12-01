import React, {useContext} from 'react';
import { StatsChart } from "@/adminSite/dashboard/components";
import { Stats } from '@/adminSite/common';
import TemplateContext from "@/layouts/secure-template/context";
import _get from 'lodash.get';

const Dashboard = () => {
  const {
    userData,
  } = useContext(TemplateContext);
  return (
    <>
      <Stats />
      {_get(userData, 'is_admin', false) && ( <StatsChart/> )}
    </>
  );
};

export default Dashboard;