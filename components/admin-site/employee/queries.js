import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';

export const CREATE_EMPLOYEE = async data => {
  const res = await axios.post(`${baseURL}/v1/user`, data);
  return res?.data;
};

export const GET_ALL_EMPLOYEES = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/user/all-users`,
    { params: params },
  );
  return res?.data;
};
export const GET_EMPLOYEE_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/user/${params.employeeId}`);
  return res?.data;
};
export const DELETE_EMPLOYEE = async employeeId => {
  const res = await axios.delete(`${baseURL}/v1/user/${employeeId}`);
  return res?.data;
};
export const UPDATE_EMPLOYEE = async data => {
  const res = await axios.patch(`${baseURL}/v1/user/${data.id}`, data.data);
  return res?.data;
};
export const UPDATE_STORAGE_FILE = async fileId => {
  const res = await axios.patch(`${baseURL}/v1/storage-file/${fileId}`);
  return res?.data;
};
