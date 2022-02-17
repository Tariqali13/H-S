import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { VideoFormMulti } from '../components';
import { Formik } from 'formik';
import { validateCreateVideoForm } from '../validation';
import { CREATE_VIDEO_MULTI } from '../queries';
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";
import Router, { useRouter } from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";

const CreateVideo = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const {
    mutate: createVideoMulti,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_VIDEO_MULTI);
  const { user_id } = getLocalStorageValues();
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
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateVideo;