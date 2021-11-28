import React from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {GET_VIDEO_BY_ID} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {FormHeader} from "@/adminSite/common";
import {Formik} from "formik";
import _get from "lodash.get";
import {VideoForm} from "@/adminSite/videos/components";
import {ProcessingModal} from "@/components/modal";

const ViewVideo = () => {
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
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(videoData, 'data.title', ''),
          description: _get(videoData, 'data.description', ''),
          video_id: _get(videoData, 'data.video_id', {}),
        }}
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <VideoForm {...formikProps} isView={true} />
          );}}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default ViewVideo;