import React from 'react';
import Dashboard from "@/adminSite/dashboard";
import SecureTemplate from "@/layouts/secure-template";

const DashboardMain = () => {
  return (
    <SecureTemplate title="Dashboard">
      <Dashboard />
    </SecureTemplate>
  );
};

export default DashboardMain;