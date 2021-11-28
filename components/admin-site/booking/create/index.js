import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { BookingForm } from '../components';
import { Formik } from 'formik';
import { validateCreateBookingForm } from '../validation';
import { CREATE_BOOKING } from '../queries';
import { useMutation } from "react-query";
import _omit from 'lodash.omit';
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";

const CreateBooking = () => {
  const {
    mutate: createBooking,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_BOOKING);
  const { user_id } = getLocalStorageValues();
  return (
    <SecureTemplate title="Create Booking">
      <FormHeader heading="Create Booking" />
      <Formik
        initialValues={{
          full_name: "",
          email: "",
          phone_number: "",
          state: "",
          stateObj: {},
          city: "",
          cityObj: {},
          address: "",
          product_id: {},
          created_by: user_id,
        }}
        validationSchema={validateCreateBookingForm}
        onSubmit={async (values, actions) => {
          values.product_id = values.product_id._id;
          await createBooking(
            _omit(values, 'stateObj', 'cityObj'), {
              onSuccess: res => {
                Message.success(res);
                Router.push(
                  "/admin/bookings",
                  "/admin/bookings",
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
            <BookingForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateBooking;