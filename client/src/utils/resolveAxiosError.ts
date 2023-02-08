import { AxiosError } from "axios";
import axios from "axios";
import { errorCode } from "../constants/errors/axiosErrorCodes";
import { errorMessage } from "../constants/errors/errorMessages";

export const resolveAxiosError = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    switch (error.code) {
      case errorCode.NETWORK_ERROR:
        return errorMessage.DEAD_API;
      default:
        if (error.response?.data?.errorMessage) {
          return error.response.data.errorMessage;
        }
        return errorMessage.SIGNUP_ERROR;
    }
  } else {
    return errorMessage.UNKNOWN_ERROR;
  }
};
