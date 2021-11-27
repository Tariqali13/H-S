// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const GET_ALL_CONTACTS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/contact/all-contacts`,
    { params: params },
  );
  return res?.data;
};

export const GET_CONTACT_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/contact/${params.contactId}`);
  return res?.data;
};

export const DELETE_CONTACT = async contactId => {
  const res = await axios.delete(`${baseURL}/v1/contact/${contactId}`);
  return res?.data;
};
