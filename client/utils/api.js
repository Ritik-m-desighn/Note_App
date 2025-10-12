import axios from "axios";

const api = axios.create({
  baseURL: localStorage.getItem("baseURL") || "http://localhost:5000/api",
});

// if i had used cookie  pareser in backend then in cookie section of browser contains the token dont need to send token inn each route as a requuest and then backend verify 
//thisone is prefered for mobile apps where cookies are not used
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
