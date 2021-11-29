import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { EmployeeForm } from '../components';
import { Formik } from 'formik';
import { useQuery } from "react-query";
import { GET_EMPLOYEE_BY_ID } from "@/adminSite/employee/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";

const ViewEmployee = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const isEnabled = employeeId !== undefined;
  const {
    data: employeeData,
    isLoading,
  } = useQuery(['GET_EMPLOYEE_BY_ID', { employeeId }],
    GET_EMPLOYEE_BY_ID, {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError: err => {
        Message.error(err);
        router.back();
      },
    });
  return (
    <SecureTemplate title="View Employee">
      <FormHeader heading="View Employee" />
      <Formik
        enableReinitialize={true}
        initialValues={{
            first_name: _get(employeeData, 'data.first_name', ''),
            last_name: _get(employeeData, 'data.last_name', ''),
            email: _get(employeeData, 'data.email', ''),
            password: _get(employeeData, 'data.password', ''),
          pictures_data: _get(employeeData, 'data.image_id', []),
        }}
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <EmployeeForm {...formikProps} isView={true} />
          );}}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewEmployee;