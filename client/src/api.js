import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend API URL
});

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const signUpUser = async (data) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

export default api;
