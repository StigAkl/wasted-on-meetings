import axios from "axios";

export const setToken = (name: string, token: string) => {
  localStorage.setItem(name, token);
};

export const getToken = (name: string) => {
  return localStorage.getItem(name);
};

export const getAxiosInstance = () => {
  const token = getToken("accessToken");

  return axios.create({
    headers: {
      Authorization: token ? `Bearer ${getToken("accessToken")}` : null,
    },
  });
};
