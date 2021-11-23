/* eslint-disable no-undef */
const baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_URI || '';
const appMode = process.env.NEXT_PUBLIC_APP_MODE || 'dev';
const publicToken = process.env.NEXT_PUBLIC_API_TOKEN;
const uppyApiUrl = process.env.NEXT_PUBLIC_UPPY_API_URI || '';

export {
  baseURL,
  appMode,
  publicToken,
  uppyApiUrl,
};
