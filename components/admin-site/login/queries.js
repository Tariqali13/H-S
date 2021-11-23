// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
// Design Queries and Mutations Start

export const LOGIN = async data => {
  const res = await axios.post(`${baseURL}/v1/auth/login`, data);
  return res?.data;
};
