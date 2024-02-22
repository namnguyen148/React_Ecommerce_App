import Cookies from "js-cookie";
import axios from "axios";

// const tokenString = localStorage.getItem('token');
// const token = JSON.parse(tokenString);
// Create axios instance with base url and credentials support
export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/api`,
  headers: {
    "content-type": "application/json",
    'accept': "application/json",
  },
  withCredentials: true,
});

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
  // If http method is `post | put | delete` and XSRF-TOKEN cookie is
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
  // proceed with the initial response
  if (
    ( 
      config.method === "post" ||
      config.method === "put" ||
      config.method === "patch" ||
      config.method === "delete") &&
    /* other methods you want to add here */
    !Cookies.get("XSRF-TOKEN")
  ) {
    // return setCSRFToken().then((response) => config);
    return setCSRFToken().then((response) => {
      config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
      return config;
    });
  }
  config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
  return config;
};

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
  return axiosInstance.get(`${process.env.REACT_APP_URL}/sanctum/csrf-cookie`); // resolves to '/api/csrf-cookie'.
};

const onResponse = (response) => {
  // Do something with the response data
  return response;
};
const onError = (error) => {
  if (error.response && error.response.status === 401) {
    console.log('token hết hạng...');
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    // window.location.href = '/admin/login';
  }
  return Promise.reject(error);
};


// attach your interceptor
axiosInstance.interceptors.request.use(onRequest, null);
axiosInstance.interceptors.response.use(onResponse, onError);

export default axiosInstance;
