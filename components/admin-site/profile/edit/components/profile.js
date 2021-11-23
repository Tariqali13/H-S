import React, {useContext} from 'react';
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import TemplateContext from "@/layouts/secure-template/context";
import { validateUpdateProfileForm} from '../validation';
import { ProfileForm } from "./index";
import {ProcessingModal} from "@/components/modal";
import { UPDATE_USER_DATA } from '../../queries';
import { useMutation } from "react-query";

const Profile = () => {
  const {
    mutate: updateUserData,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_USER_DATA);
  const {
    userData,
    isLoadingUserData,
    refetchUserData,
  } = useContext(TemplateContext);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: _get(userData, 'first_name', ''),
          last_name: _get(userData, 'last_name', ''),
          email: _get(userData, 'email', ''),
          image_id: _get(userData, 'image_id', ''),
        }}
        validationSchema={validateUpdateProfileForm}
        onSubmit={async (values, actions) => {
          await updateUserData({
            id: _get(userData, '_id', ''),
            data: {...values, image_id: _get(values, 'image_id._id', '')},
          }, {
            onSuccess: async res => {
              await refetchUserData();
              Message.success(res);
              actions.resetForm();
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
            <ProfileForm
              {...formikProps}
              isLoadingSave={isLoadingUserData || isLoadingSave}
              buttonText="Update"
            />
          );
        }}
      </Formik>
      {(isLoadingUserData || isLoadingSave) && <ProcessingModal />}
    </>
  );
};

export { Profile };