import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { FolderForm } from '../components';
import { Formik } from 'formik';
import { validateCreateFolderForm } from '../validation';
import {CREATE_VIDEO, GET_VIDEO_BY_ID} from '@/adminSite/videos/queries';
import {useMutation, useQuery} from "react-query";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";
import { useRouter } from "next/router";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';

const CreateFolder = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const {
    mutate: createfolder,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_VIDEO);
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
    <SecureTemplate title="Add Folders">
      <FormHeader heading="Add Folders" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: "",
          description: "",
          image_id: {},
          created_by: user_id,
          type: 'folder',
          is_blocked: false,
          unblock_after: '',
          parent_count: _get(folderData, 'data.parent_count') >= 0 ? _get(folderData, 'data.parent_count', 0) + 1 : 0,
        }}
        validationSchema={validateCreateFolderForm}
        onSubmit={async (values, actions) => {
          if (values?.image_id?._id) {
            values.image_id = values.image_id._id;
          } else {
            delete values.image_id;
          }
          if (values?.unblock_after?._id) {
            values.unblock_after = values.unblock_after._id;
          }
          if (folderId) {
            values.folder_id = folderId;
          }
          await createfolder(values, {
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
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {(isLoadingSave || isLoading) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateFolder;