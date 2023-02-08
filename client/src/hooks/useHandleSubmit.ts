import { AxiosResponse } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { getAxiosInstance } from "../auth/auth";
import { resolveAxiosError } from "../utils/resolveAxiosError";

interface FormData {
  email: string;
  password: string;
}

const useHandleSubmit = (url: string) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [results, setResults] = useState<AxiosResponse>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const axios = getAxiosInstance();
      const results = await axios.post(url, {
        data: formData,
      });
      setSuccess(true);
      setResults(results);
    } catch (error: any) {
      setError(resolveAxiosError(error));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    results,
    loading,
    error,
    success,
  };
};

export default useHandleSubmit;
