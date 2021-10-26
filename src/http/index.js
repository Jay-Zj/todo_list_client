import { getRequest, postRequest, delRequest, putRequest } from "./request";

const addListItem = (url, params) => {
  return postRequest(url, params);
};
