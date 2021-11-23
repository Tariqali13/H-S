import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import  { UserData }  from "@/adminSite/profile/component";
import {FormHeader} from "@/adminSite/common";

const Profile = () => {
  return (
    <SecureTemplate title="Profile">
      <FormHeader isProfile={true} />
      <UserData />
    </SecureTemplate>
  );
};

export default Profile;