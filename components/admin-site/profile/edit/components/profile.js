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
import {City, State} from "country-state-city";
import _omit from "lodash.omit";

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
  const state = State.getStateByCodeAndCountry(
    _get(userData, 'state', ''), 'US',
  );
  const cities = City.getCitiesOfState(
    'US', _get(userData, 'state', ''),
  );
  const findCity = cities?.find(
    city => city.name === _get(userData, 'city', ''),
  );
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: _get(userData, 'first_name', ''),
          last_name: _get(userData, 'last_name', ''),
          email: _get(userData, 'email', ''),
          phone_number: _get(userData, 'phone_number', ''),
          state: _get(userData, 'state', ''),
          stateObj: state,
          city: _get(userData, 'city', ''),
          cityObj: findCity,
          address: _get(userData, 'address', ''),
          position: _get(userData, 'position', ''),
          image_id: _get(userData, 'image_id', ''),
        }}
        validationSchema={validateUpdateProfileForm}
        onSubmit={async (values, actions) => {
          if (_get(values, 'image_id._id', '')) {
            values.image_id = values.image_id._id;
          } else {
            delete values.image_id;
          }
          await updateUserData({
            id: _get(userData, '_id', ''),
            data: _omit(values, 'confirm_password', 'stateObj', 'cityObj', 'email'),
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
              is_admin={_get(userData, 'is_admin', false)}
            />
          );
        }}
      </Formik>
      {(isLoadingUserData || isLoadingSave) && <ProcessingModal />}
    </>
  );
};

export { Profile };