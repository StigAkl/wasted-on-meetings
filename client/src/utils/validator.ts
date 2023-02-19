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
  matchingPasswords: boolean;
}

export const passwordValidator = (p1: string, p2: string): FormValidation => {
  let passwordError = "";
  let matchingPasswords = true;

  if (!p1 || !p1.match(passwordRegex)) {
    passwordError = "Dette var dårlig passordvalg gitt. ";
  }

  if (p1 !== p2) {
    matchingPasswords = false;
  }

  return {
    passwordError,
    matchingPasswords,
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

  const { passwordError, matchingPasswords } = passwordValidator(
    formData.password,
    formData.repeatPassword
  );

  setFormValidation({
    emailError,
    passwordError,
    pwIsMatching: matchingPasswords,
  });

  if (emailError || passwordError) return false;

  return true;
};
