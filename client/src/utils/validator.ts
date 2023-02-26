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

  if (!p1 || !p1.match(passwordRegex)) {
    passwordError = "Dette var dårlig passordvalg gitt. ";
  }

  return {
    passwordError,
  };
};

export const emailValidator = (email: string): boolean => {
  if (!email) return false;

  if (!email.match(emailRegex)) return false;

  return true;
};

export const validateForm = (
  formData: FormData,
  setFormValidation: Dispatch<SetStateAction<FormValidationType>>
) => {
  let emailError = "";
  if (!emailValidator(formData.email)) {
    emailError = "Du vet da hvordan en e-post ser ut?!";
  }

  const { passwordError } = passwordValidator(formData.password);

  setFormValidation({
    emailError,
    passwordError,
  });

  if (emailError || passwordError) return false;

  return true;
};
