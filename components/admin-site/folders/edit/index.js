import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import {FolderForm} from '../components';
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
import {validateUpdateFolderForm} from "@/adminSite/folders/validation";

const EditFolder = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const {
    mutate: updateFolder,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_VIDEO);
  const { user_id } = getLocalStorageValues();
  const isEnabled = folderId !== undefined;
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
    <SecureTemplate title="Edit Folder">
      <FormHeader heading="Edit Folder" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(folderData, 'data.title', ''),
          description: _get(folderData, 'data.description', ''),
          image_id: _get(folderData, 'data.image_id', {}),
          updated_by: user_id,
        }}
        validationSchema={validateUpdateFolderForm}
        onSubmit={async (values, actions) => {
          if (values?.image_id?._id) {
            values.image_id = values.image_id._id;
          } else {
            delete values.image_id;
          }
          await updateFolder({
            id: folderId,
            data: values,
          }, {
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
            <FolderForm
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

export default EditFolder;