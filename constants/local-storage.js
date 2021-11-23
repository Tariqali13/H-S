/* eslint-disable no-undef */

export const getLocalStorageValues = () => {
  const isWindow = typeof window !== 'undefined';
  const user_id = isWindow ? localStorage.getItem('user_id') : '';
  const token = isWindow ? localStorage.getItem('token') : '';

  return {
    user_id,
    token,
  };
};
