// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const CREATE_VIDEO = async data => {
  const res = await axios.post(`${baseURL}/v1/video`, data);
  return res?.data;
};

export const CREATE_VIDEO_MULTI = async data => {
  const res = await axios.post(`${baseURL}/v1/video/multiple`, data);
  return res?.data;
};

export const GET_ALL_VIDEOS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/video/all-videos`,
    { params: params },
  );
  return res?.data;
};

export const GET_VIDEO_COUNT = async () => {
  const res = await axios.get(baseURL + `/v1/video/videos-count`);
  return res?.data;
};

export const GET_VIDEO_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/video/${params.videoId}`);
  return res?.data;
};

export const UPDATE_VIDEO = async data => {
  const res = await axios.patch(`${baseURL}/v1/video/${data.id}`, data.data);
  return res?.data;
};

export const DELETE_VIDEO = async VIDEOId => {
  const res = await axios.delete(`${baseURL}/v1/video/${VIDEOId}`);
  return res?.data;
};
