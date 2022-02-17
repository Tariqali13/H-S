// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const CREATE_FOLDER = async data => {
  const res = await axios.post(`${baseURL}/v1/folder`, data);
  return res?.data;
};

export const GET_ALL_FOLDERS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/folder/all-folders`,
    { params: params },
  );
  return res?.data;
};

export const GET_FOLDER_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/folder/${params.folderId}`);
  return res?.data;
};

export const UPDATE_FOLDER = async data => {
  const res = await axios.patch(`${baseURL}/v1/folder/${data.id}`, data.data);
  return res?.data;
};

export const DELETE_FOLDER = async VIDEOId => {
  const res = await axios.delete(`${baseURL}/v1/folder/${VIDEOId}`);
  return res?.data;
};

export const GET_EMPLOYEE_PROGRESS_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/employee-progress/${params.employeeId}`, { params: params?.params });
  return res?.data;
};