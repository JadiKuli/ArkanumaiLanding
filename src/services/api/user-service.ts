import api from "../config/axios";

export const userService = {
  me: () => api.get("/user"),
};
