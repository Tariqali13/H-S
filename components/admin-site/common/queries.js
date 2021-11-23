// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const GET_DASHBOARD_STATS = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(
    baseURL + `/v1/dashboard/admin-stats`,
    { params: params },
  );
  return res?.data;
};
