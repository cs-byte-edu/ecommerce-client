import api from "../apiClient";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("auth/local", {
      identifier: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("api/auth/local/register", userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("users/me");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("api/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (code, password, passwordConfirmation) => {
    const response = await api.post("api/auth/reset-password", {
      code,
      password,
      passwordConfirmation,
    });
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("api/users/me", userData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post("api/auth/change-password", {
      currentPassword,
      password: newPassword,
      passwordConfirmation: newPassword,
    });
    return response.data;
  },
};
