import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { FolderForm } from '../components';
import { Formik } from 'formik';
import { validateCreateFolderForm } from '../validation';
import { CREATE_FOLDER } from '../queries';
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";

const CreateFolder = () => {
  const {
    mutate: createfolder,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_FOLDER);
  const { user_id } = getLocalStorageValues();
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
        }}
        validationSchema={validateCreateFolderForm}
        onSubmit={async (values, actions) => {
          if (values?.image_id?._id) {
            values.image_id = values.image_id._id;
          } else {
            delete values.image_id;
          }
          await createfolder(values, {
            onSuccess: res => {
              Message.success(res);
              Router.push(
                "/admin/h-s-academy",
                "/admin/h-s-academy",
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
            <FolderForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateFolder;