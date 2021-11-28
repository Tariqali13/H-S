import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { BookingForm } from '../components';
import { Formik } from 'formik';
import {useMutation, useQuery} from "react-query";
import {UPDATE_BOOKING, GET_BOOKING_BY_ID} from "@/adminSite/booking/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Router, { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import moment from "moment";
import { City, State } from "country-state-city";
import { ProcessingModal } from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";
import {validateUpdateBookingForm} from "@/adminSite/booking/validation";
import _omit from "lodash.omit";

const EditBooking = () => {
  const router = useRouter();
  const { bookingId } = router.query;
  const {
    mutate: updateBooking,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_BOOKING);
  const { user_id } = getLocalStorageValues();
  const isEnabled = bookingId !== undefined;
  const {
    data: bookingData,
    isLoading,
  } = useQuery(['BOOKING_BY_ID', { bookingId }], GET_BOOKING_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  const state = State.getStateByCodeAndCountry(
    _get(bookingData, 'data.state', ''), 'US',
  );
  const cities = City.getCitiesOfState(
    'US', _get(bookingData, 'data.state', ''),
  );
  const findCity = cities?.find(
    city => city.name === _get(bookingData, 'data.city', ''),
  );
  return (
    <SecureTemplate title="Edit Booking">
      <FormHeader heading="Edit Booking" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          full_name: _get(bookingData, 'data.full_name', ''),
          email: _get(bookingData, 'data.email', ''),
          phone_number: _get(bookingData, 'data.phone_number', ''),
          state: _get(bookingData, 'data.state', ''),
          stateObj: state,
          city: _get(bookingData, 'data.city', ''),
          cityObj: findCity,
          address: _get(bookingData, 'data.address', ''),
          product_id: _get(bookingData, 'data.product_id', {}),
          updated_by: user_id,
        }}
        validationSchema={validateUpdateBookingForm}
        onSubmit={async (values, actions) => {
          values.product_id = values.product_id._id;
          await updateBooking({
            id: bookingId,
            data: _omit(values, 'stateObj', 'cityObj'),
          }, {
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
              buttonText="Update"
            />
          );}}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditBooking;