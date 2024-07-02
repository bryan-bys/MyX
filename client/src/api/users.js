import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const userRegister = (data) => {
  return axios.post(`https://myx-ttm2.onrender.com/users/register/`, data);
};

export const userLogin = (data) => {
  return axios.post(`https://myx-ttm2.onrender.com/users/login/`, data);
};

export const post = (data, token) => {
  return axios.post(`https://myx-ttm2.onrender.com/api/post/`, {}, {});
};
