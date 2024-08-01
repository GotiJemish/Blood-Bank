import axios from 'axios';

// Define the API base URL here or fetch it from a server endpoint if necessary
const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
