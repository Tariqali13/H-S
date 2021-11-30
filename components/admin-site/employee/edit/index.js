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
import {City, State} from "country-state-city";

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
    const state = State.getStateByCodeAndCountry(
        _get(employeeData, 'data.state', ''), 'US',
    );
    const cities = City.getCitiesOfState(
        'US', _get(employeeData, 'data.state', ''),
    );
    const findCity = cities?.find(
        city => city.name === _get(employeeData, 'data.city', ''),
    );
  return (
    <SecureTemplate title="Edit Employee">
      <FormHeader heading="Edit Employee" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: _get(employeeData, 'data.first_name', ''),
          last_name: _get(employeeData, 'data.last_name', ''),
          email: _get(employeeData, 'data.email', ''),
          new_password: "",
          confirm_password: "",
            phone_number: _get(employeeData, 'data.phone_number', ''),
            state: _get(employeeData, 'data.state', ''),
            stateObj: state,
            city: _get(employeeData, 'data.city', ''),
            cityObj: findCity,
            address: _get(employeeData, 'data.address', ''),
            position:_get(employeeData, 'data.position', ''),
            image_id: _get(employeeData, 'data.image_id', []),
            updated_by: user_id,
        }}
        validationSchema={validateUpdateEmployeeForm}
        onSubmit={async (values, actions) => {
          values.image_id = values.image_id._id;
          await updateEmployee({
            id: employeeId,
            data: _omit(values, 'confirm_password','stateObj','cityObj', 'email'),
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
              isEdit={true}
            />
          );}}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditEmployee;