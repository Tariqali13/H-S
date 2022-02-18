import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { VideoFormMulti } from '../components';
import { Formik } from 'formik';
import { validateCreateVideoForm } from '../validation';
import {CREATE_VIDEO_MULTI, GET_VIDEO_BY_ID} from '../queries';
import {useMutation, useQuery} from "react-query";
import {Message} from "@/components/alert/message";
import Router, { useRouter } from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";
import _get from "lodash.get";
import reactQueryConfig from "@/constants/react-query-config";

const CreateVideo = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const {
    mutate: createVideoMulti,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_VIDEO_MULTI);
  const { user_id } = getLocalStorageValues();
  const isEnabled = typeof folderId == 'string';
  const {
    data: folderData,
    isLoading,
  } = useQuery(['VIDEO_BY_ID', { videoId: folderId }], GET_VIDEO_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title="Add Video">
      <FormHeader heading="Add Video" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: "",
          folder_id: folderId,
          image_id: {},
          description: "",
          videos_data: [],
          type: 'video',
          parent_count: _get(folderData, 'data.parent_count') >= 0 ? _get(folderData, 'data.parent_count', 0) + 1 : 0,
          created_by: user_id,
        }}
        validationSchema={validateCreateVideoForm}
        onSubmit={async (values, actions) => {
          values.videos_data = values.videos_data.map(video => video._id);
          if (values?.image_id?._id) {
            values.image_id = values.image_id._id;
          } else {
            delete values.image_id;
          }
          await createVideoMulti(values, {
            onSuccess: res => {
              Message.success(res);
              Router.back();
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
            <VideoFormMulti
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {(isLoadingSave || isLoading) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateVideo;