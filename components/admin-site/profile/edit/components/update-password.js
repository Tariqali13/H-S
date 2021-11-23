import React from 'react';
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import { validateUpdatePassForm } from '../validation';
import { UpdatePassForm } from "./index";
import {ProcessingModal} from "@/components/modal";
import { UPDATE_PASSWORD } from '../../queries';
import { useMutation } from "react-query";
import {removeLocalStorageCred} from "@/utils/local-storage";
import Router from "next/router";
import _omit from 'lodash.omit';

const UpdatePassword = () => {
  const {
    mutate: updatePassword,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_PASSWORD);
  const handleLogout = () => {
    removeLocalStorageCred();
    Router.push('/admin/login', '/admin/login');
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          old_password: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validateUpdatePassForm}
        onSubmit={async (values, actions) => {
          await updatePassword(_omit(values, 'confirm_password'), {
            onSuccess: async res => {
              Message.success(res);
              actions.resetForm();
              handleLogout();
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
            <UpdatePassForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
            />
          );
        }}
      </Formik>
      {(isLoadingSave) && <ProcessingModal />}
    </>
  );
};

export { UpdatePassword };