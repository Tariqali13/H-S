import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { EmployeeForm } from '../components';
import { Formik } from 'formik';
import {useMutation, useQuery} from "react-query";
import {UPDATE_EMPLOYEE, GET_EMPLOYEE_BY_ID}
  from "@/adminSite/employee/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Router, { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";
import { validateUpdateEmployeeForm} from
  "@/adminSite/employee/validation";
import _omit from "lodash.omit";

const EditEmployee = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const {
    mutate: updateEmployee,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_EMPLOYEE);
  const { user_id } = getLocalStorageValues();
  const isEnabled = employeeId !== undefined;
  const {
    data: employeeData,
    isLoading,
  } = useQuery(['GET_EMPLOYEE_BY_ID',
    { employeeId }], GET_EMPLOYEE_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title="Edit Employee">
      <FormHeader heading="Edit Employee" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(employeeData, 'data.title', ''),
          content: _get(employeeData, 'data.content', ''),
          employee_by_name: _get(employeeData,
            'data.employee_by_name', ''),
          employee_by_image_id: _get(employeeData,
            'data.employee_by_image_id', {}),
          updated_by: user_id,
        }}
        validationSchema={validateUpdateEmployeeForm}
        onSubmit={async (values, actions) => {
          values.employee_by_image_id = values.employee_by_image_id._id;
          await updateEmployee({
            id: employeeId,
            data: values,
          }, {
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
              buttonText="Update"
            />
          );}}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditEmployee;