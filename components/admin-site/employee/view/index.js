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
import {City, State} from "country-state-city";
import {positionOptions} from "@/constants/employee";
import {GET_EMPLOYEE_PROGRESS_BY_ID} from "@/adminSite/videos/queries";

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
  const state = State.getStateByCodeAndCountry(
    _get(employeeData, 'data.state', ''), 'US',
  );
  const cities = City.getCitiesOfState(
    'US', _get(employeeData, 'data.state', ''),
  );
  const findCity = cities?.find(
    city => city.name === _get(employeeData, 'data.city', ''),
  );
  const findPosition = positionOptions.find(
    pos => pos.value === _get(employeeData, 'data.position', ''));
  const {
    data: employeeProgressData,
  } = useQuery(['EMPLOYEE_PROGRESS_BY_ID', { employeeId: employeeId, params: { is_populate: true } }],
    GET_EMPLOYEE_PROGRESS_BY_ID, {
      ...reactQueryConfig,
      enabled: isEnabled,
    });
  return (
    <SecureTemplate title="View Employee">
      <FormHeader heading={`View Employee - Progress ${_get(employeeData, 'data.employee_progress', 0)}%`} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: _get(employeeData, 'data.first_name', ''),
          last_name: _get(employeeData, 'data.last_name', ''),
          email: _get(employeeData, 'data.email', ''),
          phone_number: _get(employeeData, 'data.phone_number', ''),
          state: _get(employeeData, 'data.state', ''),
          stateObj: state,
          city: _get(employeeData, 'data.city', ''),
          cityObj: findCity,
          address: _get(employeeData, 'data.address', ''),
          position: findPosition,
          image_id: _get(employeeData, 'data.image_id', []),
          created_by: _get(employeeData, 'data.created_by', ''),

        }}
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <EmployeeForm
              {...formikProps}
              isView={true}
              employeeProgressData={_get(employeeProgressData, 'data', {})}
            />
          );}}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewEmployee;