import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { EmployeeForm } from '../components';
import { Formik } from 'formik';
import {validateCreateEmployeeForm } from "@/adminSite/employee/validation";
import {CREATE_EMPLOYEE} from "../queries";
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";
import _omit from 'lodash.omit';
import _get from 'lodash.get';

const CreateEmployee = () => {
  const {
    mutate: createEmployee,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_EMPLOYEE);
  const { user_id } = getLocalStorageValues();
  return (
    <SecureTemplate title="Create Employee">
      <FormHeader heading="Create Employee" />
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          state: "",
          stateObj: {},
          city: "",
          cityObj: {},
          address: "",
          phone_number: "",
          email: "",
          password: "",
          confirm_password: "",
          position: "",
          is_active: true,
          image_id: {},
          created_by: user_id,
        }}
        validationSchema={validateCreateEmployeeForm}
        onSubmit={async (values, actions) => {
          if (_get(values, 'image_id._id', '')) {
            values.image_id = values.image_id._id;
          } else {
            delete values.image_id;
          }
          values.position = values.position.value;
          await createEmployee(
            _omit(values, 'confirm_password', 'stateObj', 'cityObj'), {
              onSuccess: res => {
                Message.success(res);
                Router.push(
                  "/admin/employees",
                  "/admin/employees",
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
            <EmployeeForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateEmployee;