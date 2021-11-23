import _get from 'lodash/get';

type Data = {
  data: {
    _id: string,
  },
  token: string,
}
// This function will save the local storage values for user login and signup
export const saveLocalStorageCred = (data: Data) => {
  const userId = _get(data, 'data._id', '');
  const token = _get(data, 'token', '');
  // eslint-disable-next-line no-undef
  localStorage.setItem('user_id', userId);
  // eslint-disable-next-line no-undef
  localStorage.setItem('token', token);
  return;
};

// This function will save the local storage values for user login and signup
export const removeLocalStorageCred = () => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('user_id');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('token');
  return;
};
