import { useState, useEffect } from "react";
import { refreshUrl } from "../constants/api";
import { ACCESS_TOKEN, RFT } from "../constants/constants";
import { clearStorage, getToken, setToken } from "../utils/token";

const useRequest = <T>(apiUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      const token = getToken(ACCESS_TOKEN);

      const options: RequestInit = {
        headers: {
          "x-access-token": token,
        },
      };

      try {
        const response = await fetch(apiUrl, options);

        const responseData: T = await response.json();

        if (!cancelled) {
          setData(responseData);
        }

        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
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

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return [data, error, loading];
};

export default useRequest;
