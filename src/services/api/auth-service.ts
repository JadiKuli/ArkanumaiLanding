import api from "../config/axios";

export const authService = {
  login: (username: string, password: string) =>
    api.post("/auth/login", { username, password }),
  register: (username: string, password: string) =>
    api.post("/auth/register", { username, password }),
  logout: () => api.post("/auth/logout"),
};
