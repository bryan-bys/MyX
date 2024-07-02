import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const userRegister = (data) => {
  return axios.post(`${URL}/users/register/`, data);
};

export const userLogin = (data) => {
  return axios.post(`${URL}/users/login/`, data);
};

export const post = (data, token) => {
  return axios.post(`${URL}/api/post/`, {}, {});
};
