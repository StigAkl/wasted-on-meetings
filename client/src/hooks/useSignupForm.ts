import { AxiosResponse } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { getAxiosInstance } from "../auth/auth";
import { resolveAxiosError } from "../utils/resolveAxiosError";
import {
  emailValidator,
  passwordValidator,
  validateForm,
} from "../utils/validator";

export interface FormData {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface FormValidation {
  emailError: string;
  passwordError: string;
  pwIsMatching: boolean;
}

const useSignupForm = (url: string) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [results, setResults] = useState<AxiosResponse>();
  const [formValidation, setFormValidation] = useState<FormValidation>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validateForm(formData, setFormValidation)) {
      setSuccess(false);
      setError("");
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
