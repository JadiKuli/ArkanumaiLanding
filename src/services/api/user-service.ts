import api from "../config/axios";

export const userService = {
  me: () => api.get("/user"),
  updateWallet: (payload: { walletId: string, source?: string }) =>
    api.put("/user", payload),
};
