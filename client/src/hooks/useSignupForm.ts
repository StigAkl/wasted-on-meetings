import { AxiosResponse } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { getAxiosInstance } from "../utils/token";
import { resolveAxiosError } from "../utils/resolveAxiosError";
import { validateForm } from "../utils/validator";

export interface FormData {
  email: string;
  password: string;
}

export interface FormValidation {
  emailError: string;
  passwordError: string;
}

const useSignupForm = (url: string) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [results, setResults] = useState<AxiosResponse>();
  const [formValidation, setFormValidation] = useState<FormValidation>({
    emailError: "",
    passwordError: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const axios = getAxiosInstance();
    setSuccess(false);
    if (validateForm(formData, setFormValidation)) {
      setError("");
      setLoading(true);
      try {
        const results = await axios.post(url, formData);
        setSuccess(true);
        setResults(results);
      } catch (err: any) {
        setError(resolveAxiosError(err));
      } finally {
        setLoading(false);
      }
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
    formValidation,
  };
};

export default useSignupForm;
