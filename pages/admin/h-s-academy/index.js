import React from 'react';
import Folder from "@/adminSite/folders";
import SecureTemplate from "@/layouts/secure-template";

const FolderMain = () => {
  return (
    <SecureTemplate title="H&S Academy">
      <Folder />
    </SecureTemplate>
  );
};

export default FolderMain;