export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const authUrl = `${API_BASE_URL}/api/v1/auth/signin`;
export const refreshUrl = `${API_BASE_URL}/api/v1/auth/refresh`;
export const signUpUrl = `${API_BASE_URL}/api/v1/auth/signup`;
export const fetchUserUrl = `${API_BASE_URL}/api/v1/user`;
export const createMeetingUrl = `${API_BASE_URL}/api/v1/meeting/create`;
export const fetchMeetings = `${API_BASE_URL}/api/v1/meeting`;
