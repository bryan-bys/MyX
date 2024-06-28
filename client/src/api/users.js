import axios from "axios";

export const userRegister = (data) => {
  return axios.post("http://127.0.0.1:8000/users/register/", data);
};

export const userLogin = (data) => {
  return axios.post("http://127.0.0.1:8000/users/login/", data);
};

export const post = (data, token) => {
  return axios.post("http://127.0.0.1:8000/api/post/", {}, {});
};
