import axios from "axios";

const api = axios.create({
  baseURL: 'http://api.localdev.com:4000/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;