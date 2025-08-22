import { persist } from "zustand/middleware";
import { authService } from "../../api/services/authService";
import { subscribeWithSelector } from "zustand/middleware";

export const createAuthSlice = persist(
  subscribeWithSelector((set, get) => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isInitialized: false,

    login: async (credentials) => {
      set({ loading: true, error: null });
      try {
        const { jwt, user } = await authService.login(credentials);
        set({
          user,
          token: jwt,
          isAuthenticated: true,
          loading: false,
          error: null,
          isInitialized: true,
        });
        return { success: true, user };
      } catch (error) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.message ||
          "Помилка авторизації";
        set({
          loading: false,
          error: errorMessage,
          user: null,
          token: null,
          isAuthenticated: false,
          isInitialized: true,
        });
        return { success: false, error: errorMessage };
      }
    },

    logout: async () => {
      // Очищуємо корзину
      // await get().clearCart();

      get().resetCartItems();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        isInitialized: true,
      });
    },

    initializeAuth: async () => {
      if (get().isInitialized) {
        console.log("⚠️ Auth вже ініціалізовано");
        return;
      }

      const { token, user } = get();

      if (!token) {
        console.log("🔓 Немає токена, завершуємо ініціалізацію");
        set({ isInitialized: true });
        return;
      }

      if (token && user) {
        console.log("✅ Користувач вже є, встановлюємо isAuthenticated");
        set({
          isAuthenticated: true,
          isInitialized: true,
        });
        return;
      }

      console.log("🔍 Перевіряємо токен...");
      set({ loading: true });

      try {
        const fetchedUser = await authService.getCurrentUser();
        console.log("✅ Токен дійсний");
        set({
          user: fetchedUser,
          isAuthenticated: true,
          loading: false,
          isInitialized: true,
        });
      } catch (error) {
        console.warn("❌ Токен недійсний:", error);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          isInitialized: true,
        });
      }
    },
  })),
  {
    name: "auth-storage",
    partialize: (state) => ({
      token: state.token,
      user: state.user,
    }),
  }
);
