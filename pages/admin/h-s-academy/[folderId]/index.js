import React from 'react';
import Video from "@/adminSite/videos";
import SecureTemplate from "@/layouts/secure-template";

const VideoMain = () => {
  return (
    <SecureTemplate title="Videos">
      <Video />
    </SecureTemplate>
  );
};

export default VideoMain;