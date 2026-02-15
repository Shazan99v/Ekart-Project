import axios from "axios";

const API = "http://localhost:5000/api";

export const register = (data) =>
  axios.post(`${API}/auth/register`, data);

export const verifyOTP = (data) =>
  axios.post(`${API}/auth/verify-otp`, data);

export const login = (data) =>
  axios.post(`${API}/auth/login`, data);

export const adminLogin = (data) =>
  axios.post(`${API}/admin/login`, data);

export const forgotPassword = (data) =>
  axios.post(`${API}/auth/forgot-password`, data);

export const resetPassword = (data) =>
  axios.post(`${API}/auth/reset-password`, data);
