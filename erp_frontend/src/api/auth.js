import axios from 'axios';

const API_URL = "http://127.0.0.1:8000"; // Your backend URL

export const signup = (data) => axios.post(`/api/users/signup/`, data);
export const login = (data) => axios.post(`/api/users/login/`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password/`, data);
