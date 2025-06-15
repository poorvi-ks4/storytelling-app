// services/authService.js
import axios from 'axios';
const API_URL = 'http://localhost:7000/api/auth';

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const register = (username, password, role) => {
  return axios.post(`${API_URL}/register`, { username, password, role });
};
