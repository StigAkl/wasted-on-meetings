import { Dispatch, SetStateAction } from "react";
import {
  FormData,
  FormValidation as FormValidationType,
} from "../hooks/useSignupForm";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

interface FormValidation {
  passwordError: string;
}

export const passwordValidator = (p1: string): FormValidation => {
  let passwordError = "";

  if (!p1 || p1.length < 7) {
    passwordError = "Dette var dårlig passordvalg gitt. ";
  }

  return {
    passwordError,
  };
};

export const emailValidator = (username: string): boolean => {
  return true;
};

export const validateForm = (
  formData: FormData,
  setFormValidation: Dispatch<SetStateAction<FormValidationType>>
) => {
  let usernameError = "";
  if (!emailValidator(formData.email) || !formData.email.match(emailRegex)) {
    usernameError = "Du vet da hvordan en e-post ser ut?!";
  }

  const { passwordError } = passwordValidator(formData.password);

  setFormValidation({
    emailError: usernameError,
    passwordError,
  });

  if (usernameError || passwordError) return false;

  return true;
};
