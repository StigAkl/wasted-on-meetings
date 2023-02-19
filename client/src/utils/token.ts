import axios from "axios";
import { refreshUrl } from "../constants/api";
import { ACCESS_TOKEN, RFT } from "../constants/constants";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const setToken = (name: string, token: string) => {
  localStorage.setItem(name, token);
};

export const getToken = (name: string) => {
  const token = localStorage.getItem(name);
  return token ? token : "";
};

export const clearStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(RFT);
};

export const setTokens = (data: LoginResponse) => {
  setToken(ACCESS_TOKEN, data.accessToken);
  setToken(RFT, data.refreshToken);
};

export const getAxiosInstance = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      console.log("using?!");
      const token = getToken(ACCESS_TOKEN);
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      console.log("REJECTING?");
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await newToken();
            const { accessToken, refreshToken } = rs.data.data;
            setToken(ACCESS_TOKEN, accessToken);
            setToken(RFT, refreshToken);
          } catch (refreshError: any) {
            console.log("REJECTING?!?");
            //Invalid tokens, clearing all tokens
            clearStorage();
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

const newToken = async () => {
  const token = getToken(RFT);
  return getAxiosInstance().post(refreshUrl, undefined, {
    headers: {
      "x-refresh-token": token,
    },
  });
};
