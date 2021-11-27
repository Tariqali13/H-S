// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const CREATE_BOOKING = async data => {
  const res = await axios.post(`${baseURL}/v1/booking`, data);
  return res?.data;
};

export const GET_ALL_BOOKINGS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/booking/all-bookings`,
    { params: params },
  );
  return res?.data;
};

export const GET_BOOKING_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/booking/${params.bookingId}`);
  return res?.data;
};

export const UPDATE_BOOKING = async data => {
  const res = await axios.patch(`${baseURL}/v1/booking/${data.id}`, data.data);
  return res?.data;
};

export const DELETE_BOOKING = async bookingId => {
  const res = await axios.delete(`${baseURL}/v1/booking/${bookingId}`);
  return res?.data;
};
