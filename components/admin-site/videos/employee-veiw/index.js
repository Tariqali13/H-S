import React from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {GET_VIDEO_BY_ID} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {FormHeader} from "@/adminSite/common";
import _get from "lodash.get";
import {EmployeeVideoView} from "@/adminSite/videos/components";
import {ProcessingModal} from "@/components/modal";

const ViewVideoEmployee = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const isEnabled = videoId !== undefined;
  const {
    data: videoData,
    isLoading,
  } = useQuery(['VIDEO_BY_ID', { videoId }], GET_VIDEO_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title="View Video">
      <FormHeader heading="View Video" />
      <EmployeeVideoView videoData={_get(videoData, 'data', {})} />
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default ViewVideoEmployee;