import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { publicToken } from '@/constants/env';
import { getLocalStorageValues } from '@/constants/local-storage';

export const VerifyUserToken = () => {
  const { token } = getLocalStorageValues();
  const router = useRouter();
  const isWindow = typeof window !== 'undefined';
  const { pathname } = router;
  const securePaths = pathname.includes('/admin');
  const excludePaths = '/admin/login';
  if (!token && securePaths && pathname !== excludePaths) {
    return isWindow ? Router.push(
      `/admin/login`, `/admin/login`, { shallow: true }) : '';
  }
  if (!token) {
    axios.defaults.headers.common.Authorization = `Public ${publicToken}`;
  }
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
