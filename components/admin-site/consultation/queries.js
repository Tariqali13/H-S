// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const CREATE_CONSULTATION = async data => {
  const res = await axios.post(`${baseURL}/v1/consultation`, data);
  return res?.data;
};
export const GET_ALL_CONSULTATIONS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/consultation/all-consultation`,
    { params: params },
  );
  return res?.data;
};

export const GET_CONSULTATION_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/consultation/${params.consultationId}`);
  return res?.data;
};

export const DELETE_CONSULTATION = async consultationId => {
  const res = await axios.delete(`${baseURL}/v1/consultation/${consultationId}`);
  return res?.data;
};
