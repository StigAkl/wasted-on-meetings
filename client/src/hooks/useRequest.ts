import { useState } from "react";
import { refreshUrl } from "../constants/api";
import { ACCESS_TOKEN, RFT } from "../constants/constants";
import { clearStorage, getToken, setToken } from "../utils/token";

type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";

const useRequest = <T>(apiUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const performRequest = async (method?: RequestMethod, body?: any) => {
    setLoading(true);
    const token = getToken(ACCESS_TOKEN);

    const options: RequestInit = {
      method: method || "GET",
      body: body ?? JSON.stringify(body),
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const responseData: T = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }

      setData(responseData);
    } catch (e: any) {
      setError(e as Error);

      if (e.message === "HTTP status: 401") {
        const refreshToken = getToken(RFT);
        const refreshOptions: RequestInit = {
          method: "POST",
          headers: { "x-refresh-token": refreshToken },
        };

        try {
          const refreshResponse = await fetch(refreshUrl, refreshOptions);

          if (!refreshResponse.ok) {
            throw new Error(
              `Error getting token. Status: ${refreshResponse.status}`
            );
          }

          const refreshJson = await refreshResponse.json();
          const { accessToken, refreshToken } = refreshJson.data;

          setToken(ACCESS_TOKEN, accessToken);
          setToken(RFT, refreshToken);
        } catch (e: any) {
          setError(e as Error);
          clearStorage();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, performRequest };
};

export default useRequest;
