import axios from "axios";
import { ACCESS_TOKEN, RTF } from "../constants/constants";

export const setToken = (name: string, token: string) => {
  localStorage.setItem(name, token);
};

export const getToken = (name: string) => {
  return localStorage.getItem(name);
};

export const getAxiosInstance = () => {
  const token = getToken(ACCESS_TOKEN);
  const refreshToken = getToken(RTF);
  return axios.create({
    headers: {
      Authorization: token ? `Bearer ${getToken(ACCESS_TOKEN)}` : null,
      "rf-token": refreshToken,
    },
  });
};
