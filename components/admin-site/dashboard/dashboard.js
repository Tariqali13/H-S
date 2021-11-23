import React from 'react';
import SecureTemplate from '@/layouts/secure-template';
import { StatsChart } from "@/adminSite/dashboard/components";
import { Stats } from '@/adminSite/common';

const Dashboard = () => {
  return (
    <SecureTemplate title="Dashboard">
      <Stats />
      <StatsChart />
    </SecureTemplate>
  );
};

export default Dashboard;