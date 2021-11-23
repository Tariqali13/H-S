import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';

export const CREATE_TESTIMONIAL = async data => {
  const res = await axios.post(`${baseURL}/v1/testimonial`, data);
  return res?.data;
};

export const GET_ALL_TESTIMONIALS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/testimonial/all-testimonials`,
    { params: params },
  );
  return res?.data;
};
export const GET_TESTIMONIAL_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/testimonial/${params.testimonialId}`);
  return res?.data;
};
export const DELETE_TESTIMONIAL = async testimonialId => {
  const res = await axios.delete(`${baseURL}/v1/testimonial/${testimonialId}`);
  return res?.data;
};
export const UPDATE_TESTIMONIAL = async data => {
  const res = await axios.patch(`${baseURL}/v1/testimonial/${data.id}`, data.data);
  return res?.data;
};
export const UPDATE_STORAGE_FILE = async fileId => {
  const res = await axios.patch(`${baseURL}/v1/storage-file/${fileId}`);
  return res?.data;
};
