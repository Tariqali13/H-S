import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { VideoForm } from '../components';
import { Formik } from 'formik';
import {useMutation, useQuery} from "react-query";
import {
  UPDATE_VIDEO,
  GET_VIDEO_BY_ID,
} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Router, { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";
import {validateUpdateVideoForm} from "@/adminSite/videos/validation";

const EditGallery = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const {
    mutate: updateVideo,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_VIDEO);
  const { user_id } = getLocalStorageValues();
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
    <SecureTemplate title="Edit Videos">
      <FormHeader heading="Edit Videos" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(videoData, 'data.title', ''),
          description: _get(videoData, 'data.description', ''),
          video_id: _get(videoData, 'data.video_id', {}),
          updated_by: user_id,
        }}
        validationSchema={validateUpdateVideoForm}
        onSubmit={async (values, actions) => {
          values.video_id = values.video_id._id;
          await updateVideo({
            id: videoId,
            data: values,
          }, {
            onSuccess: res => {
              Message.success(res);
              Router.push(
                "/admin/training-videos",
                "/admin/training-videos",
                { shallow: true },
              );
            },
            onError: err => {
              Message.error(err);
              actions.resetForm();
            },
          });
        }}
      >
        {formikProps => {
          return (
            <VideoForm
              {...formikProps}
              isView={false}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
            />
          );}}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditGallery;