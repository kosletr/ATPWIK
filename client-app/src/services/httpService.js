import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occured.");
    console.error(error);
  }

  return Promise.reject(error);
});

const addJWTHeader = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

const exportObj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  addJWTHeader,
};

export default exportObj;
