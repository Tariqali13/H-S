import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';

export const CREATE_PRODUCT = async data => {
  const res = await axios.post(`${baseURL}/v1/product`, data);
  return res?.data;
};

export const GET_ALL_PRODUCTS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/product/all-products`,
    { params: params },
  );
  return res?.data;
};
export const GET_PRODUCT_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/product/${params.productId}`);
  return res?.data;
};
export const DELETE_PRODUCT = async productId => {
  const res = await axios.delete(`${baseURL}/v1/product/${productId}`);
  return res?.data;
};
export const UPDATE_PRODUCT = async data => {
  const res = await axios.patch(`${baseURL}/v1/product/${data.id}`, data.data);
  return res?.data;
};
export const UPDATE_STORAGE_FILE = async fileId => {
  const res = await axios.patch(`${baseURL}/v1/storage-file/${fileId}`);
  return res?.data;
};
