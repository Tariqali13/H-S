import _get from "lodash.get";
import axios from "axios";
import {baseURL} from "@/constants/env";

export const GET_USER_BY_ID = async (key: any) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(baseURL + `/v1/user/${params.userId}`);
  return res?.data;
};