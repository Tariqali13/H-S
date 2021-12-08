import React from 'react';
import EditProfile from '@/adminSite/profile/edit';
import SecureTemplate from "@/layouts/secure-template";

const EditProfileMain = () => {
  return (
    <SecureTemplate title="Edit Profile">
      <EditProfile />
    </SecureTemplate>
  );
};
export default EditProfileMain;